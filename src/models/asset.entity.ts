import {
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToMany,
  Entity
} from 'typeorm';
import { Product } from './product.entity';

/**
 *
 *
 * @export
 * @class Asset
 * @extends {BaseEntity}
 */
@Entity()
export class Asset extends BaseEntity {
  /**
   *
   *
   * @type {string}
   * @memberof Asset
   */
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  /**
   *
   *
   * @type {Product[]}
   * @memberof Asset
   */
  @ManyToMany(() => Product, product => product.assets, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    lazy: true
  })
  public products: Product[];
}
