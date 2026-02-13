import path from 'node:path';
import { User } from '../../generated/prisma/client';
import {
  JWT_ACCOUNT_ACTIVATION_SECRET_KEY,
  JWT_TOKEN_SECRET_KEY,
  POS_APP_URL,
} from '../configs/main.config';
import { prisma } from '../configs/prisma-client.config';
import AppError from '../helpers/app-error.helper';
import { hashing, hashMatch } from '../helpers/bcrypt.helper';
import { jwtCreateToken } from '../helpers/jwt.helper';
import transporter from '../helpers/nodemailer.helper';
import fs from 'fs';
import Handlebars from 'handlebars';
import jwt from 'jsonwebtoken';

export const authService = {
  async register({
    email,
    username,
    role,
  }: Pick<User, 'email' | 'username' | 'role'>) {
    const findUserByEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (findUserByEmail) throw AppError('Email already registered', 400);

    const createdUser = await prisma.user.create({
      data: {
        username,
        email,
        role,
      },
    });

    const activationToken = jwtCreateToken(
      {
        userId: createdUser?.id,
      },
      JWT_ACCOUNT_ACTIVATION_SECRET_KEY!,
      {
        expiresIn: '1h',
      },
    );

    const templateDir = path.resolve(__dirname, './../templates');

    const templatePath = path.join(templateDir, 'account-activation.html');

    const templateSource = fs.readFileSync(templatePath, 'utf-8');

    const compiledTemplate = Handlebars.compile(templateSource);

    const html = compiledTemplate({
      email: email,
      activationAccountUrl: `${POS_APP_URL}/account-activation/${activationToken}`,
    });

    await transporter.sendMail({
      to: email,
      subject: 'Account Activation',
      html: html,
    });
  },

  async login({ email, password }: Pick<User, 'email' | 'password'>) {
    const findUserByEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (!findUserByEmail) throw AppError('User account not registered', 404);

    if (!findUserByEmail.isActive) throw AppError('User account inactive', 401);

    if (!findUserByEmail.password) throw AppError('Invalid credentials', 404);

    const passwordMatched = await hashMatch(
      password!,
      findUserByEmail?.password,
    );

    if (!passwordMatched) throw AppError('User password is invalid', 400);

    const token = jwtCreateToken(
      { userId: findUserByEmail?.id, role: findUserByEmail?.role },
      JWT_TOKEN_SECRET_KEY!,
      {
        expiresIn: '1d',
      },
    );

    return {
      username: findUserByEmail?.username,
      role: findUserByEmail?.role,
      token,
    };
  },

  async session(userId: string) {
    const findUserById = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return {
      username: findUserById?.username,
      role: findUserById?.role,
    };
  },

  async activation(password: string, token: string) {
    const payload = jwt.verify(token, JWT_ACCOUNT_ACTIVATION_SECRET_KEY!);

    if (typeof payload === 'string' || !('userId' in payload)) {
      throw new Error('Invalid token payload');
    }

    const hashedPassword = await hashing(password);

    await prisma.user.update({
      data: {
        password: hashedPassword,
        isActive: true,
      },
      where: {
        id: payload.userId,
      },
    });
  },
};
