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

		if (!id) {
			return res.status(403).json({
				error: 'Bad request, id was not provided',
			});
		}

		const connection = getConnection();

		const product = await connection
			.getRepository(Product)
			.createQueryBuilder('product')
			.where('product.lagerId = :id', { id })
			.getOne();

		const data = product ? [product] : [];

		return res.status(200).json({ data });
	} catch (error) {
		console.log('Error occurred in getProductById %s', error.message || error.stack);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
};
