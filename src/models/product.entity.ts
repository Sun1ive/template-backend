import { BaseEntity, Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { Category } from './category.entity';
import { Country } from './country.entity';

@Entity()
export class Product extends BaseEntity {
	@PrimaryColumn()
	public lagerId: number;

	@Column({ type: 'text', nullable: true })
	public lagerName: string;

	@Column({ type: 'text', nullable: true })
	public lagerUnit: string;

	@Column({ type: 'decimal', nullable: true })
	public lagerPrice: number;

	@Column({ type: 'text', nullable: true })
	public lagerNameUA: string;

	@ManyToOne(() => Category, (category) => category.products, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	public category: Category;

	@ManyToOne(() => Country, (country) => country.products, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	public country: Country;
}
