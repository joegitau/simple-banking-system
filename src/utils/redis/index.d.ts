// import Redis from 'ioredis';
// import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';

// import Logger from '../logger';
// import config from '../../config';

// const redis = new Redis({
//   port: config.REDIS_PORT,
//   host: config.REDIS_HOST,
// });

/////////////////////////////////////////////////////////////////////////////////////////////////
// *
// Declaration Merging Of Module.
// https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
// *
/////////////////////////////////////////////////////////////////////////////////////////////
// declare module 'typeorm/query-builder/SelectQueryBuilder' {
//   interface SelectQueryBuilder<E> {
//     CustomGetOne(): Promise<E | undefined>;

//     CustomGetOneOrFail(): Promise<E>;
//   }
// }

// FIXME: entire monkey-patch needs to be re-written
// furthermore, TypeORM ships with caching - though would be more ideal to integrate redis
// prettier-ignore
// SelectQueryBuilder.prototype.CustomGetOne = async function <E>(): Promise< E | undefined> {
//   Logger.debug('Custom GetOne fn called!');
  
//   const key = JSON.stringify(
//     Object.assign({}, this.getQuery(), { entity: this.alias })
//   );
//   Logger.info('Key %o', key);

//   const cached = await redis.get(key);
//   if (cached) {
//     return cached;
//   }

//   const result = await this.getOne();
//   return result;
// };

// prettier-ignore
// SelectQueryBuilder.prototype.CustomGetOneOrFail = async function <E>(): Promise<E> {
//   const key = JSON.stringify(
//     Object.assign({}, this.getQuery(), { entity: this.alias })
//   );
//   Logger.info('Key %o', key);

//   Logger.debug('Custom GetOneOrFail fn called!');
//   Logger.debug('Entity Alias %o', this.alias);
//   Logger.debug('Query %o', this.getQuery());

//   return this.getOneOrFail();
// };

// class Cache {
//   private redis;

//   constructor() {
//     this.redis = new Redis({
//       port: config.REDIS_PORT,
//       host: config.REDIS_HOST,
//       keyPrefix: 'cache:',
//     });
//   }

//   set(key: string, value: any): Promise<'OK' | null> {
//     return this.redis.set(key, JSON.stringify(value), 'EX', 60 * 60 * 24); // ttl -> 24hrs
//   }

//   async get(key: string): Promise<any> {
//     const cached = await this.redis.get(key);

//     return cached ? JSON.parse(cached) : null;
//   }

//   del(key: string): Promise<number> {
//     return this.redis.del(key);
//   }

//   flushAll(): Promise<'OK'> {
//     return this.redis.flushall();
//   }
// }

// export default new Cache();
