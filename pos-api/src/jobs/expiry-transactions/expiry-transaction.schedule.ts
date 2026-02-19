import cron from 'node-cron'
import { expiryTransactionJob } from './expiry-transaction.job';

export function expiryTransactionSchedule() {
  cron.schedule('*/1 * * * *', async () => {
    console.info('⌚[CRON]: Executing expiry transaction(s) jobs 🔃');
    await expiryTransactionJob();
  });
}
