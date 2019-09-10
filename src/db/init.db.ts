import { getConnection } from 'typeorm';
import { ICategory, ICountry, IData } from '../../tests/mocks/types';
import { readFile } from 'fs';
import { Category } from '../models/category.entity';
import { promisify } from 'util';
import { resolve } from 'path';
import { Country } from '../models/country.entity';
import { Product } from '../models/product.entity';

export const seedDatabase = async () => {
	const connection = getConnection();
	const products = JSON.parse(await promisify(readFile)(resolve('tests/mocks/data.json'), 'utf8')) as IData[];
	const categories = JSON.parse(await promisify(readFile)(resolve('tests/mocks/category.json'), 'utf8')) as ICategory[];
	const countries = JSON.parse(await promisify(readFile)(resolve('tests/mocks/countries.json'), 'utf8')) as ICountry[];

	const categoryRepo = connection.getRepository(Category);
	const countryRepo = connection.getRepository(Country);
	const productRepo = connection.getRepository(Product);
	await categoryRepo.delete({});
	await productRepo.delete({});
	await countryRepo.delete({});

	const catValues = categories.map((c) => ({
		id: c.macroId,
		name: c.macroName,
	}));

	const countValues = countries.map((country) => ({
		id: country.idCB,
		code: country.Code,
		fullName: country.FullName,
	}));

	const prodValues = products.map((prod) =>
		productRepo.create({
			...prod,
			category: categoryRepo.create({
				id: prod.lagerMacroID,
			}),
			country: countryRepo.create({
				id: prod.lagerCountryId,
			}),
		}),
	);

	await categoryRepo
		.createQueryBuilder()
		.insert()
		.values(catValues)
		.execute();

	await countryRepo
		.createQueryBuilder()
		.insert()
		.values(countValues)
		.execute();

	await productRepo
		.createQueryBuilder()
		.insert()
		.values(prodValues)
		.execute()
		.catch(console.error);
};
