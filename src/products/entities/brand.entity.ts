import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Product } from './product.entity';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  image: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  updateAt: Date;

  /**Una marca muchos productos */
  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
}
