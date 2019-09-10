import { Config } from '../src/config';
import { seedDatabase } from '../src/db/init.db';
import { Category } from '../src/models/category.entity';
import { Connection, createConnection, getConnection } from 'typeorm';
import { Product } from '../src/models/product.entity';
import { Country } from '../src/models/country.entity';

function getDataFromRepo<T extends typeof Category | typeof Country | typeof Product>(entity: T) {
	return getConnection()
		.getRepository(entity)
		.find();
}

describe('testing database models', () => {
	let connection: Connection | undefined;

	beforeAll(async () => {
		connection = await createConnection({
			database: Config.databaseOptions.name,
			type: 'postgres',
			password: Config.databaseOptions.password,
			username: Config.databaseOptions.user,
			host: Config.databaseOptions.host,
			entities: [Category, Product, Country],
			logger: 'debug',
			logging: true,
			synchronize: true,
		});

		await connection.getRepository(Category).delete({});
		await connection.getRepository(Product).delete({});
		await connection.getRepository(Country).delete({});
	});

	afterAll(async () => {
		if (connection) {
			await connection.close();
		}
	});

	test('should get empty database', async () => {
		const categories = await getDataFromRepo(Category);
		const products = await getDataFromRepo(Product);
		const countries = await getDataFromRepo(Country);

		expect(Array.isArray(categories)).toBeTruthy();
		expect(Array.isArray(products)).toBeTruthy();
		expect(Array.isArray(countries)).toBeTruthy();
		expect(categories.length).toBe(0);
		expect(products.length).toBe(0);
		expect(countries.length).toBe(0);
	});

	test('should seed database with test data', async () => {
		await seedDatabase();

		const categories = await getDataFromRepo(Category);
		const products = await getDataFromRepo(Product);
		const countries = await getDataFromRepo(Country);

		expect(categories).toBeDefined();
		expect(categories.length).not.toEqual(0);
		expect(products).toBeDefined();
		expect(products.length).not.toEqual(0);
		expect(countries).toBeDefined();
		expect(countries.length).not.toEqual(0);
	});
});
