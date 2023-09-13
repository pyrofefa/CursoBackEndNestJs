import {
  PrimaryGeneratedColumn,
  ManyToOne,
  Entity,
  OneToMany,
  Column,
} from 'typeorm';
import { Customer } from './customer.entity';
import { OrderItem } from './order-item.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  /*@ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;*/

  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];
}
