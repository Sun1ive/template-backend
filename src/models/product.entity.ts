import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: false, type: 'text' })
  public name: string;
}
