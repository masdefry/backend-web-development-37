import { Request, Response } from 'express';
import prisma from '../config/prisma-client.config';
import { usersService } from '../services/users.service';

/*
  Controller:
  1. Handle request
  2. Handle response
*/

export const usersController = {
  async get(req: Request, res: Response) {
    const users = await usersService.get();

    res.status(200).json({
      success: true,
      message: 'Get users successfull',
      data: users,
    });
  },
  async create(req: Request, res: Response) {
    const { username, email, fullName, role } = req.body;

    await usersService.create({username, email, fullName, role})

    res.status(201).json({
      success: true,
      message: 'Create user successfull',
      data: {
        username,
        email,
        fullName,
      },
    });
  },
};
