import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Client } from './Client.entity';

export enum TransactionType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

@Entity('transactions')
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  @Index()
  uuid: string;

  @Column({ type: 'enum', enum: TransactionType })
  type: string;

  @Column({ type: 'numeric' })
  amount: number;

  @ManyToOne(() => Client, (client) => client.transactions, {
    onDelete: 'CASCADE',
  })
  // @JoinColumn({ name: 'clientId' })
  @JoinColumn()
  client: Client;

  @BeforeInsert()
  createUuid() {
    this.uuid = uuid();
  }
}
