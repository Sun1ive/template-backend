import { getConnection } from 'typeorm';
import { readFile } from 'fs';
import { Category } from '../models/category.entity';
import { promisify } from 'util';
import { resolve } from 'path';

export const seedDatabase = async () => {
	const connection = getConnection();
	const res = JSON.parse(await promisify(readFile)(resolve('tests/mocks/categories.json'), 'utf8'));
	console.log(res);

	const categoryRepo = connection.getRepository(Category);
	await categoryRepo.delete({});

	await connection
		.createQueryBuilder()
		.insert()
		.into(Category)
		.values(res)
		.execute();
};
