import { Request, Response } from 'express';
import { menuService } from '../services/menu.service';

export const menuController = {
  async getAll(req: Request, res: Response) {
    const menus = await menuService.getAll();

    res.status(200).json({
      success: true,
      message: 'Get all menu successful',
      data: menus,
    });
  },

  async getById(req: Request, res: Response) {
    const { id } = req?.params;

    const menu = await menuService?.getById(id as string);

    res.status(200).json({
      success: true,
      message: `Get product with id = ${id} successful`,
      data: menu,
    });
  },
};
