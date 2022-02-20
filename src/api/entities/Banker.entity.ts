import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

import { Person } from './common/Person.entity';
import { Client } from './Client.entity';

@Entity('bankers')
export class Banker extends Person {
  @Column({ unique: true, type: 'numeric' })
  employeeNumber: number;

  @ManyToMany(() => Client)
  @JoinTable({
    name: 'bankers_clients',
    joinColumn: {
      name: 'banker',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'client',
      referencedColumnName: 'id',
    },
  })
  clients: Client[];
}
