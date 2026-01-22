/*
    Service:
    1. Backend logic
    2. Query database
*/

import prisma from '../config/prisma-client.config';
import { User } from '../generated/prisma/client';
import AppError from '../helpers/app-error.helper';

/*
    Repository:
    1. Query database
*/


export const usersService = {
  async get() {
    return await prisma.user.findMany();
  },

  async create({username, email, fullName, role }: Pick<User, 'username' | 'email' | 'fullName' | 'role'>) {
    const findUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (findUser?.id) throw AppError('Email already registered', 500);

    await prisma.user.create({
      data: {
        username,
        email,
        fullName,
        role,
      },
    });
  },
};
