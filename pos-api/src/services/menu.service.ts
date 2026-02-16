import { Menu } from '../../generated/prisma/client';
import { prisma } from '../configs/prisma-client.config';
import redisConfig from '../configs/redis.config';
import { cloudinaryUpload } from '../helpers/cloudinary.helper';

export const menuService = {
  async getAll(page: number, limit: number) {
    const cacheKey=`menus:${page}`

    const cacheMenusJSON = await redisConfig.get(cacheKey);

    if (cacheMenusJSON) {
      const cacheMenus = await JSON.parse(cacheMenusJSON);
     
      return {
        menus: cacheMenus?.menus,
        totalMenus: cacheMenus?.totalMenus,
        totalPages: cacheMenus?.totalPages,
      };
    }

    const offset = (page - 1) * limit;

    const menus = await prisma.menu.findMany({
      skip: offset,
      take: limit,
      include: {
        menuImage: true,
      },
    });

    const totalMenus = await prisma.menu.count();

    const totalPages = Math.ceil(totalMenus / limit);

    const result = await redisConfig.set(
      cacheKey,
      JSON.stringify({ menus, totalMenus, totalPages }),
      'EX',
      60,
    );

    return {
      menus,
      totalMenus,
      totalPages,
    };
  },
  async getById(id: string) {
    return await prisma.menu.findFirst({
      where: {
        id,
      },
    });
  },

  async create(
    files: Express.Multer.File[],
    {
      name,
      price,
      description,
      isAvailable,
    }: Pick<Menu, 'name' | 'price' | 'description' | 'isAvailable'>,
  ) {
    await prisma.$transaction(async (tx) => {
      const createdMenu = await tx.menu.create({
        data: {
          name,
          description,
          price,
          isAvailable,
        },
      });

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

      const cloudinaryUploaded = files?.map(
        async (file: Express.Multer.File) => {
          const { secureUrl } = await cloudinaryUpload(file?.buffer);
          return { imageUrl: secureUrl, menuId: createdMenu?.id };
        },
      );

      const filesToSave = await Promise.all(cloudinaryUploaded);

      await tx?.menuImage?.createMany({
        data: filesToSave,
      });
    });
  },
};
