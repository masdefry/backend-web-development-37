import { prisma } from '../../configs/prisma-client.config';
import { log } from '../../helpers/winston.helper';

export async function expiryTransactionJob() {
  const expiredTransactions = await prisma?.transaction?.updateMany({
    where: {
      expiry: {
        lt: new Date(),
      },
      status: 'WAITING_FOR_PAYMENT',
    },
    data: {
      status: 'CANCELLED',
    },
  });

  log.info(
    `⌚[CRON]: ${expiredTransactions.count} transaction(s) has been expiry 💸`,
  );
}
