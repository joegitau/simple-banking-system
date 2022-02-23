import Redis from 'ioredis';

import config from '../../config';

class Cache {
  private redis;

  constructor() {
    this.redis = new Redis({
      port: config.REDIS_PORT,
      host: config.REDIS_HOST,
      keyPrefix: 'cache:',
    });
  }

  set(key: string, value: any): Promise<'OK' | null> {
    return this.redis.set(key, JSON.stringify(value), 'EX', 60 * 60 * 24); // ttl -> 24hrs
  }

  async get(key: string): Promise<any> {
    const cached = await this.redis.get(key);

    return cached ? JSON.parse(cached) : null;
  }

  del(key: string): Promise<number> {
    return this.redis.del(key);
  }

  flushAll(): Promise<'OK'> {
    return this.redis.flushall();
  }
}

export default new Cache();
