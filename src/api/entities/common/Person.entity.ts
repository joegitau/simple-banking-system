import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
@Entity()
export abstract class Person extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'uuid' })
  uuid: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  createUuid() {
    this.uuid = uuid();
  }

  // override toJSON() to discard Entitiy Id
  toJSON() {
    return { ...this, id: undefined };
  }
}
