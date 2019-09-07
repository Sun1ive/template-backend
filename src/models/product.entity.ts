import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  PrimaryColumn,
  Generated
} from 'typeorm';
import { Category } from './category.entity';
import { Asset } from './asset.entity';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ nullable: false, type: 'text' })
  public name: string;

  @ManyToOne(() => Category, category => category.products, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  public category: Category;

  @ManyToMany(() => Asset, asset => asset.products)
  public assets: Asset[];
}
