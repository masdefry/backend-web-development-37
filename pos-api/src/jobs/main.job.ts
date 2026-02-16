import { expiryTransactionSchedule } from './expiry-transactions/expiry-transaction.schedule';

export function mainJobs() {
  expiryTransactionSchedule();
}
