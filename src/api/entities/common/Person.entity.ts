import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { IsEmail, IsString } from 'class-validator';
@Entity()
export abstract class Person extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column({ type: 'uuid' })
  @Index()
  uuid: string;

  @Column()
  @IsString()
  firstname: string;

  @Column()
  @IsString()
  lastname: string;

  @Column()
  @Index({ unique: true })
  @IsEmail({}, { message: 'Invalid email address.' })
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

  @BeforeUpdate()
  updateDates() {
    this.updatedAt = new Date();
  }

  // override toJSON() to discard Entitiy Id
  // toJSON() {
  //   return { ...this, id: undefined };
  // }
}
