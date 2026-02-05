import { Request, Response } from 'express';
import { authService } from '../services/auth.service';

export const authController = {
  async register(req: Request, res: Response) {
    const { email, username, password } = req.body;

    await authService.register({ email, username, password });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        email,
        username,
      },
    });
  },

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const { username, role, token } = await authService.login({
      email,
      password,
    });

    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: false, //⚠️ Ubah true ketika production
      sameSite: 'lax', //⚠️ Ubah 'strict' ketika production
      path: '/',
    });

    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      data: {
        username,
        role,
      },
    });
  },
};
