import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  Generated,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ nullable: false, type: 'text' })
  public name: string;

  @OneToMany(() => Product, product => product.category, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  public products: Product[];
}
