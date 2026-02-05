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
};
