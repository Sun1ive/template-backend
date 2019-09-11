import { RequestHandler } from 'express-serve-static-core';
import { getConnection } from 'typeorm';
import { Product } from '../models/product.entity';

export const getProducts: RequestHandler = async (req, res) => {
	try {
		const connection = getConnection();

		const products = await connection
			.getRepository(Product)
			.createQueryBuilder()
			.getMany();

		const data = products && Array.isArray(products) ? products : [];

		return res.status(200).json({ data });
	} catch (error) {
		console.log('Error occurred in getProducts %s', error.message || error.stack);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
};

export const getProductById: RequestHandler = async (req, res) => {
	try {
		const { id } = req.params;

		const connection = getConnection();

		const product = await connection
			.createQueryBuilder(Product, 'product')
			.innerJoinAndSelect('product.country', 'country')
			.where('product.id = :id', { id })
			.getOne();

		const data = product ? [product] : [];

		return res.status(200).json({ data });
	} catch (error) {
		console.log('Error occurred in getProductById %s', error.message || error.stack);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
};
