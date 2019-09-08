import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { Category } from './category.entity';
import { Asset } from './asset.entity';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ nullable: false, type: 'text' })
  public name: string;

  @Column({ nullable: false, type: 'decimal' })
  public price: number;

  @ManyToOne(() => Category, category => category.products, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  public category: Category;

  @ManyToMany(() => Asset, asset => asset.products)
  @JoinTable()
  public assets: Asset[];
}
