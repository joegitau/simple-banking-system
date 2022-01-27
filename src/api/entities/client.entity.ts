import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { Banker } from './Banker.entity';

import { Transaction } from './Transaction.entity';
import { Person } from './common/Person.entity';

@Entity('clients')
export class Client extends Person {
  @Column({ unique: true, length: 10 })
  cardNumber: string;

  @Column({ type: 'numeric' })
  balance: number;

  @OneToMany(() => Transaction, (transaction) => transaction.client)
  transactions: Transaction[];

  @ManyToMany(() => Banker)
  bankers: Banker[];

  @Column({ type: 'simple-json', nullable: true })
  additionalInfo: {
    nextOfKin: string;
    maritalStatus: string;
  };

  @Column({ type: 'simple-array', default: [] })
  hobbies: string[];
}
