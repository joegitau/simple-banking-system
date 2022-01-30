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

enum TransactionTypes {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

@Entity('transaction')
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  @Index()
  uuid: string;

  @Column({ type: 'enum', enum: TransactionTypes })
  type: string;

  @Column({ type: 'numeric' })
  amount: number;

  @ManyToOne(() => Client, (client) => client.transactions)
  // @JoinColumn({ name: 'clientId' })
  @JoinColumn()
  client: Client;

  @BeforeInsert()
  createUuid() {
    this.uuid = uuid();
  }
}
