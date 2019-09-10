import { createConnection, Connection } from 'typeorm';
import { Config } from '../config';
import { Category } from '../models/category.entity';
import { Product } from '../models/product.entity';
import { Asset } from '../models/asset.entity';
import { seedDatabase } from './init.db';

const isProd = process.env.NODE_ENV === 'production';

/**
 * @returns {Promise<Connection>}
 */
export const initDB = async (): Promise<Connection> => {
	const baseOptions = {
		database: Config.databaseOptions.name,
		password: Config.databaseOptions.password,
		username: Config.databaseOptions.user,
		host: Config.databaseOptions.host,
		synchronize: true,
		logging: !isProd,
		entities: [Category, Product, Asset],
	};

	const connection = await createConnection({
		type: 'postgres',
		...baseOptions,
	});

	await seedDatabase();

	return connection;
};
