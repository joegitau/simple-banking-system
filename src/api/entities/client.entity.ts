import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { Banker } from './Banker.entity';

import { Transaction } from './Transaction.entity';
import { Person } from './common/Person.entity';
import { IsNumber, Max, Min } from 'class-validator';

@Entity('clients')
export class Client extends Person {
  @Column({ unique: true })
  @IsNumber()
  @Min(10, { message: 'Card number cannot have less than 10 digits.' })
  cardNumber: string;

  @Column({ type: 'numeric' })
  balance: number;

  @OneToMany(() => Transaction, (transaction) => transaction.client)
  transactions: Transaction[];

  @ManyToMany(() => Banker, { cascade: true })
  bankers: Banker[];

  @Column({ type: 'simple-json', nullable: true })
  additionalInfo: {
    nextOfKin: string;
    maritalStatus: string;
  };

  @Column({ type: 'simple-array', default: [] })
  hobbies: string[];
}
