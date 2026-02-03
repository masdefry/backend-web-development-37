import { prisma } from '../configs/prisma-client.config';

export const menuService = {
  async getAll() {
    return await prisma.menu.findMany();
  },
};
