import { Request, Response } from 'express';
import { menuService } from '../services/menu.service';

export const menuController = {
  async getAll(req: Request, res: Response) {
    const page = parseInt(req?.query?.page as string) || 1; 
    const limit = parseInt(req?.query?.limit as string) || 10;

    const {menus, totalMenus, totalPages} = await menuService.getAll(page, limit);

    res.status(200).json({
      success: true,
      message: 'Get all menu successful',
      data: {
        menus, 
        totalMenus, 
        totalPages
      },
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

  async create(req: Request, res: Response){
    const {name, price, description, isAvailable} = req.body; 
    let files: Express.Multer.File[] = []; 

    if(Array.isArray(req?.files)){
      files = req?.files
    }else{
      files = (req.files as Record<string, Express.Multer.File[]>).imagesMenu || [];
    }

    await menuService?.create(files, {name, price, description, isAvailable});

    res.status(201).json({
      success: true, 
      message: 'Create new menu successful', 
      data: {
        name, 
        price, 
        description, 
        isAvailable
      }
    })
  }
};
