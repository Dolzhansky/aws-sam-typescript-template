import Redis from 'ioredis';
import { REDIS, REDIS_DATABASE, REDIS_HOST, REDIS_PORT } from '../environment';
import { ErrorsEnum } from '../enums';
export class RedisService {
  private redis: Redis;

  constructor() {
    this.redis = new Redis(REDIS_PORT, REDIS_HOST, { db: REDIS_DATABASE })
    this.redis.connect().catch(() => {
      throw Error(ErrorsEnum.REDIS_UNAVAILABLE)
    })
  }

  public async set<T>(key: string, data: T, ttl?: number) {
    return this.redis.set(key, JSON.stringify(data), 'EX', ttl ?? 0);
  }

  public async get(key: string) {
    return this.redis.get(key);
  }

  public del(key: string) {
    return this.redis.del(key);
  }

  public ttl(key: string) {
    return this.redis.ttl(key);
  }
}