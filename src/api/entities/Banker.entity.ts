import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

import { Person } from './common/Person.entity';
import { Client } from './Client.entity';

@Entity('bankers')
export class Banker extends Person {
  @Column({ unique: true })
  employeeNumber: string;

  @ManyToMany(() => Client)
  @JoinTable({
    name: 'bankers_clients',
    joinColumn: {
      name: 'bankers',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'clients',
      referencedColumnName: 'id',
    },
  })
  clients: Client[];
}
