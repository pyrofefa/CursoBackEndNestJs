import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  Index,
} from 'typeorm';
import { Brand } from './brand.entity';
import { Category } from './category.entity';

@Entity()
@Index(['price', 'stock'])
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'varchar' })
  image: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  updateAt: Date;

  /**Muchos productos a una sola marca */
  @ManyToOne(() => Brand, (brand) => brand.products)
  brand: Brand;

  /**Un producto varias categorias */
  @ManyToMany(() => Category, (category) => category.products)
  categories: Category[];
}
