import { prisma } from '../src/configs/prisma-client.config';

const menus = [
  {
    name: 'Chicken Steak',
    price: 29900,
    description:
      'Steak ayam goreng tepung dengan brown sauce khas Waroeng, kentang & mix vegetable',
    imageUrl: 'https://waroengsteakandshake.com/img/img_menu/CHICKEN.png',
    isAvailable: true,
  },
  {
    name: 'Chicken Double',
    price: 42600,
    description:
      'Double steak ayam goreng tepung dengan brown sauce khas Waroeng, kentang & mix vegetable',
    imageUrl:
      'https://waroengsteakandshake.com/img/img_menu/CHICKEN_DOUBLE.png',
    isAvailable: true,
  },
  {
    name: 'Sirloin Steak',
    price: 36800,
    description:
      'Sirloin steak goreng tepung dengan brown sauce khas Waroeng, kentang & mix vegetable',
    imageUrl: 'https://waroengsteakandshake.com/img/img_menu/SIRLOIN.png',
    isAvailable: true,
  },
  {
    name: 'Sirloin Double',
    price: 50600,
    description:
      'Double sirloin steak goreng tepung dengan brown sauce khas Waroeng, kentang & mix vegetable',
    imageUrl:
      'https://waroengsteakandshake.com/img/img_menu/SIRLOIN_DOUBLE.png',
    isAvailable: true,
  },
  {
    name: 'Tenderloin Steak',
    price: 38500,
    description:
      'Tenderloin steak goreng tepung dengan brown sauce khas Waroeng, kentang & mix vegetable',
    imageUrl: 'https://waroengsteakandshake.com/img/img_menu/TENDERLOIN1.png',
    isAvailable: true,
  },
  {
    name: 'Tenderloin Double',
    price: 56900,
    description:
      'Double tenderloin steak goreng tepung dengan brown sauce khas Waroeng, kentang & mix vegetable',
    imageUrl:
      'https://waroengsteakandshake.com/img/img_menu/TENDERLOIN_DOUBLE1.png',
    isAvailable: true,
  },
  {
    name: 'Steak Waroeng',
    price: 39100,
    description:
      'Perpaduan chicken steak, shrimp dan beef steak dengan brown sauce khas Waroeng, kentang & mix vegetable',
    imageUrl: 'https://waroengsteakandshake.com/img/img_menu/STEAK_WAROENG.png',
    isAvailable: true,
  },
  {
    name: 'Cordon Bleu',
    price: 46000,
    description:
      'Cordon Bleu steak goreng tepung dengan brown sauce khas Waroeng, kentang & mix vegetable',
    imageUrl: 'https://waroengsteakandshake.com/img/img_menu/CORDON_BLEU.png',
    isAvailable: true,
  },
  {
    name: 'Dori Steak',
    price: 38500,
    description:
      'Steak ikan dori goreng tepung dengan brown sauce khas Waroeng, kentang & mix vegetable',
    imageUrl: 'https://waroengsteakandshake.com/img/img_menu/DORI_STEAK.png',
    isAvailable: true,
  },
];

async function main() {
  await prisma.menu.createMany({
    data: menus,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.log(`error`, err);
    await prisma.$disconnect();
    process.exit(1);
  });
