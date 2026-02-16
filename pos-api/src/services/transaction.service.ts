import { addMinutes } from 'date-fns';
import { PaymentMethod } from '../../generated/prisma/enums';
import { prisma } from '../configs/prisma-client.config';

export const transactionService = {
  async create(
    customerName: string,
    paymentMethod: PaymentMethod,
    orderItems: any[],
  ) {
    return await prisma.$transaction(async (tx) => {
      const menuIds = orderItems?.map((menu: any) => {
        return menu?.id;
      });

      const findMenu = await tx?.menu?.findMany({
        where: {
          id: {
            in: menuIds,
          },
        },
      });

      let ammount = 0

      const transactionItems = orderItems?.map((menu: any, index: number) => {
        const menuPerItem = findMenu[index];
        ammount += menuPerItem?.price * menu?.quantity

        return {
          name: menuPerItem?.name, 
          price: menuPerItem?.price, 
          quantity: menu?.quantity, 
          totalPerItem: menuPerItem?.price * menu?.quantity
        }
      });

      await tx.transaction.create({
          data: {
           customerName,
           paymentMethod, 
           ammount, 
           expiry: addMinutes(Date.now(), 1), 
           transactionItem: {
            createMany: {
              data: transactionItems
            }
           }
          }, 
          include: {
            transactionItem: true
          }
      })

      return {
        ammount, 
        transactionItems
      }
    });
  },
};

/*
    [
        { id: xxx, qty: 3 }, 
        { id: yyy, qty: 2 }
    ]

    [ xxx, yyy ]
*/
