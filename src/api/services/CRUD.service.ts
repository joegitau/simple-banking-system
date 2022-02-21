import { DeepPartial, Repository } from 'typeorm';

import { UserEntity } from '../../types';
import { ServiceHelpers } from './common/service-helpers';

export class CRUDService {
  private genericEntity: Repository<UserEntity>;
  private user: UserEntity;

  // CREATE
  create(
    input: UserEntity
  ): (getEntity: Repository<UserEntity>) => Promise<UserEntity> {
    return async (getEntity: Repository<UserEntity>) => {
      this.genericEntity = getEntity;

      const hashPassword = await ServiceHelpers.hashPassword(input);

      const entity = this.genericEntity.create({
        ...input,
        password: hashPassword,
      });

      await entity.save();
      Reflect.deleteProperty(entity, 'password');

      return entity;
    };
  }

  // GET
  get(
    uuid: string
  ): (getEntity: Repository<UserEntity>) => Promise<UserEntity> {
    return async (getEntity: Repository<UserEntity>) => {
      this.genericEntity = getEntity;

      const entity = await this.genericEntity.findOneOrFail({ uuid });
      Reflect.deleteProperty(entity, 'password');

      return entity;
    };
  }

  // GET ALL
  getAll(): (getEntity: Repository<UserEntity>) => Promise<UserEntity[]> {
    return async (getEntity: Repository<UserEntity>) => {
      this.genericEntity = getEntity;

      const entities = await this.genericEntity.find();
      entities.forEach((entity) => Reflect.deleteProperty(entity, 'password'));

      return entities;
    };
  }

  update(
    uuid: string,
    fields: DeepPartial<UserEntity>
  ): (
    getEntityFn: (uuid: string) => Promise<UserEntity>,
    getEntity: Repository<UserEntity>
  ) => Promise<UserEntity> {
    return async (
      getEntityFn: (uuid: string) => Promise<UserEntity>,
      getEntity: Repository<UserEntity>
    ) => {
      this.genericEntity = getEntity;
      this.user = await getEntityFn(uuid);

      this.genericEntity.merge(this.user, fields);

      return await this.genericEntity.save(this.user);
    };
  }
}
