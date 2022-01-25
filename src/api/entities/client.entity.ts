import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { Banker } from './Banker.entity';

import { Transaction } from './Transaction.entity';
import { Person } from './common/Person.entity';

@Entity('client')
export class Client extends Person {
  @Column({ unique: true, length: 10 })
  card_number: string;

  @Column({ type: 'numeric' })
  account_balance: number;

  @OneToMany(() => Transaction, (transaction) => transaction.client)
  transactions: Transaction[];

  @ManyToMany(() => Banker)
  bankers: Banker[];

  @Column({ type: 'simple-json', nullable: true })
  additional_info: {
    next_of_kin: string;
    marital_status: string;
  };

  @Column({ type: 'simple-array', default: [] })
  hobbies: string[];
}
