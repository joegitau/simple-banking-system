import { Column, Entity } from 'typeorm';

import { Person } from './common/Person.entity';

@Entity('banker')
export class Banker extends Person {
  @Column({ unique: true, length: 10 })
  employee_number: string;
}
