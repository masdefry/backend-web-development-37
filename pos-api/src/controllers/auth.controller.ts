import { Request, Response } from 'express';
import { authService } from '../services/auth.service';

export const authController = {
  async register(req: Request, res: Response) {
    const { email, username, role } = req.body;

    await authService.register({ email, username, role });

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

  async session(req: Request, res: Response) {
    const { userId } = res?.locals?.payload;

    const { username, role } = await authService?.session(userId);

    res.status(200).json({
      success: true,
      message: 'User auth is successful',
      data: {
        username,
        role,
      },
    });
  },
};
