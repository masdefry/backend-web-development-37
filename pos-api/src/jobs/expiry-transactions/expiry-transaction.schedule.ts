import cron from 'node-cron'
import { log } from '../../helpers/winston.helper';
import { expiryTransactionJob } from './expiry-transaction.job';

export function expiryTransactionSchedule() {
  cron.schedule('*/1 * * * *', async () => {
    log.info('⌚[CRON]: Executing expiry transaction(s) jobs 🔃');
    await expiryTransactionJob();
  });
}
