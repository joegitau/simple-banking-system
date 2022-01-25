import { Column, Entity, OneToMany } from 'typeorm';

import { Person } from './common/Person.entity';
import { Transaction } from './Transaction.entity';

@Entity('client')
export class Client extends Person {
  @Column({ unique: true, length: 10 })
  card_number: string;

  @Column({ type: 'numeric' })
  account_balance: number;

  @OneToMany(() => Transaction, (transaction) => transaction.client)
  transactions: Transaction[];

  @Column({ type: 'simple-json', nullable: true })
  additional_info: {
    next_of_kin: string;
    marital_status: string;
  };

  @Column({ type: 'simple-array', default: [] })
  hobbies: string[];
}
