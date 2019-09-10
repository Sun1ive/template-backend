import { Connection, createConnection } from 'typeorm';
import { router as categoriesRouter } from '../src/routes/categories';
import { router as productRouter } from '../src/routes/products';
import { agent } from 'supertest';
import { Config } from '../src/config';
import { Category } from '../src/models/category.entity';
import { Product } from '../src/models/product.entity';
import { Country } from '../src/models/country.entity';
import { ServerBuilder } from '../src/factories/server';

describe('testing database models', () => {
	let connection: Connection | undefined;
	const server = new ServerBuilder()
		.addCors()
		.addRoute('/categories', categoriesRouter)
		.addRoute('/products', productRouter)
		.build()
		.listen(3005);

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
	});

	afterAll(async () => {
		if (connection) {
			await connection.close();
		}
	});

	test('should getCategories', async () => {
		const app = agent(server);

		const response = await app.get('/categories');
		expect(response.status).toBe(200);
		expect(response.body.data).toBeDefined();
		expect(Array.isArray(response.body.data)).toBeTruthy();
	});

	test('should getCategoryById', async () => {
		const app = agent(server);

		const response = await app.get('/categories/1');
		expect(response.status).toBe(200);
		expect(response.body.data).toBeDefined();
		expect(Array.isArray(response.body.data)).toBeTruthy();
	});

	test('should getProducts', async () => {
		const app = agent(server);

		const response = await app.get('/products');
		expect(response.status).toBe(200);
		expect(response.body.data).toBeDefined();
		expect(Array.isArray(response.body.data)).toBeTruthy();
	});

	test('should getProductById', async () => {
		const app = agent(server);

		const response = await app.get('/products/35');
		expect(response.status).toBe(200);
		expect(response.body.data).toBeDefined();
		expect(Array.isArray(response.body.data)).toBeTruthy();
		expect(response.body.data[0].lagerId).toBe(35);
	});
});
