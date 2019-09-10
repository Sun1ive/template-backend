import { BaseEntity, Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Country extends BaseEntity {
	@PrimaryColumn('int')
	public id: number;

	@Column({ type: 'text', nullable: true })
	public code: string;

	@Column({ type: 'text', nullable: true })
	public fullName: string;

	@OneToMany(() => Product, (prod) => prod.country)
	public products: Product[];
}
