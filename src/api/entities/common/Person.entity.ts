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
import { IsEmail, IsString, Min } from 'class-validator';

export type Role = 'user' | 'client' | 'banker' | 'admin';
@Entity()
export abstract class Person extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

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

  @Column()
  @Min(3, { message: 'Password must be at least 3 characters long.' })
  password: string;

  @Column()
  role: Role = 'user';

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

  hasAccessTo(role: Role): boolean {
    const roles = ['user', 'client', 'banker'];

    return roles.indexOf(this.role) >= roles.indexOf(role);
    // return roles.includes(role);
  }

  // override toJSON() to discard Entitiy Id
  // toJSON() {
  //   return { ...this, id: undefined };
  // }
}
