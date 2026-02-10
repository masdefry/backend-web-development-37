import { Menu } from '../../generated/prisma/client';
import { prisma } from '../configs/prisma-client.config';

export const menuService = {
  async getAll() {
    return await prisma.menu.findMany();
  },
  async getById(id: string) {
    return await prisma.menu.findFirst({
      where: {
        id,
      },
    });
  },

  async create(files: Express.Multer.File[], {name, price, description, isAvailable}: Pick<Menu, 'name' | 'price' | 'description' | 'isAvailable'>){
    const createdMenu = await prisma.menu.create({
      data: {
        name, 
        description, 
        price,
        isAvailable
      }
    })

    /*
      [
        { imageUrl: img1, menuId: xxx }, 
         { imageUrl: img2, menuId: xxx }, 
          {imageUrl: img3, menuId: xxx}
      ]
    */
      const filesToCreate = files?.map((file: Express.Multer.File) => {
        return { imageUrl: file?.filename, menuId: createdMenu?.id }
      })

      await prisma?.menuImage?.createMany({
        data: filesToCreate
      })
  }
};
