import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Person extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: true, name: 'active' })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
