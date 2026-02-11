import { Menu } from '../../generated/prisma/client';
import { prisma } from '../configs/prisma-client.config';
import { cloudinaryUpload } from '../helpers/cloudinary.helper';

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
      📝 If using disk storage
      [
        { imageUrl: img1, menuId: xxx }, 
         { imageUrl: img2, menuId: xxx }, 
          {imageUrl: img3, menuId: xxx}
      ]

      const filesToCreate = files?.map((file: Express.Multer.File) => {
        return { imageUrl: file?.filename, menuId: createdMenu?.id }
      })

      await prisma?.menuImage?.createMany({
        data: filesToCreate
      })
    */
      
    const cloudinaryUploaded = files?.map(async(file: Express.Multer.File) => {
      const {secureUrl} = await cloudinaryUpload(file?.buffer); 
      return { imageUrl: secureUrl, menuId: createdMenu?.id }
    });

    const filesToSave = await Promise.all(cloudinaryUploaded);

    await prisma?.menuImage?.createMany({
      data: filesToSave
    })
  }
};
