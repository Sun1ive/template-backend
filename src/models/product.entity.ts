import { BaseEntity, Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { Category } from './category.entity';
import { Country } from './country.entity';

@Entity()
export class Product extends BaseEntity {
	@PrimaryColumn()
	public id: number;

	@Column({ type: 'text', nullable: true })
	public name: string;

	@Column({ type: 'text', nullable: true })
	public unit: string;

	@Column({ type: 'decimal', nullable: true })
	public price: number;

	@Column({ type: 'text', nullable: true })
	public nameUA: string;

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
