import IORedis from 'ioredis';
import { log } from '../helpers/winston.helper';
import { REDIS_DB, REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from './main.config';

const redisConfig = new IORedis({
  host: REDIS_HOST || '127.0.0.1',
  port: parseInt(REDIS_PORT || '6379'),
  password: REDIS_PASSWORD || undefined,
  db: parseInt(REDIS_DB || '0'),
  // Optional: Reconnect strategy
  retryStrategy: (times: number) => Math.min(times * 50, 2000),
});

redisConfig.on('connect', () =>
  log.info('🔌[REDIS]: Connected to redis-server'),
);
redisConfig.on('error', (err: any) => log.info(`❌[REDIS]: ${err}`));

export default redisConfig;
