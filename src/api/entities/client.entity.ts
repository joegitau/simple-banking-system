import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('client')
export class Client extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true, length: 10 })
  card_number: string;

  @Column({ type: 'numeric' })
  balance: number;

  @Column({ default: true, name: 'active' })
  is_active: boolean;

  @Column({ type: 'simple-json', nullable: true })
  additional_info: {
    next_of_kin: string;
    marital_status: string;
  };

  @Column({ type: 'simple-array', default: [] })
  hobbies: string[];
}
