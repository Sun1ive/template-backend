import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Category extends BaseEntity {
  @PrimaryColumn({ type: 'uuid', nullable: false })
  public id: string;

  @Column({ nullable: false, type: 'text' })
  public name: string;

  @OneToMany(() => Product, product => product.category, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  public products: Product[];
}
