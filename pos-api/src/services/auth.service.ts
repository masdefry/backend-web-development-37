import { User } from '../../generated/prisma/client';
import { JWT_TOKEN_SECRET_KEY } from '../configs/main.config';
import { prisma } from '../configs/prisma-client.config';
import AppError from '../helpers/app-error.helper';
import { hashing, hashMatch } from '../helpers/bcrypt.helper';
import { jwtCreateToken } from '../helpers/jwt.helper';
import transporter from '../helpers/nodemailer.helper';

export const authService = {
  async register({
    email,
    username,
    role
  }: Pick<User, 'email' | 'username' | 'role'>) {
    const findUserByEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (findUserByEmail) throw AppError('Email already registered', 400);

    await prisma.user.create({
      data: {
        username,
        email,
        role
      },
    });

    await transporter.sendMail({
      to: email,
      subject: 'Account Activation', 
      html: '<h1>Welcome</h1>'
    })
  },

  async login({ email, password }: Pick<User, 'email' | 'password'>) {
    const findUserByEmail = await prisma.user.findUnique({
      where: { email },
    });

    if(!findUserByEmail) throw AppError('User account not registered', 404)

    if(!findUserByEmail.isActive) throw AppError('User account inactive', 401);

    const passwordMatched = await hashMatch(password, findUserByEmail?.password)

    if(!passwordMatched) throw AppError('User password is invalid', 400)

    const token = jwtCreateToken(
      { userId: findUserByEmail?.id, role: findUserByEmail?.role }, 
      JWT_TOKEN_SECRET_KEY!, 
      {
        expiresIn: '1d'
      }
    )

    return {
      username: findUserByEmail?.username, 
      role: findUserByEmail?.role, 
      token
    }
  },

  async session(userId: string){
    const findUserById = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    return {
      username: findUserById?.username, 
      role: findUserById?.role
    }
  }
};
