import { RequestHandler } from 'express-serve-static-core';
import { getConnection } from 'typeorm';
import { Category } from '../models/category.entity';

export const getCategories: RequestHandler = async (req, res) => {
	try {
		const connection = getConnection();

		const categories = await connection
			.getRepository(Category)
			.createQueryBuilder()
			.getMany();

		const data = categories && Array.isArray(categories) ? categories : [];

		return res.status(200).json({ data });
	} catch (error) {
		console.log('Error occurred in getCategories %s', error.message || error.stack);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
};

export const getCategoryById: RequestHandler = async (req, res) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res.status(403).json({
				error: 'Bad request, id was not provided',
			});
		}

		const connection = getConnection();

		const category = await connection
			.getRepository(Category)
			.createQueryBuilder('category')
			.where('category.id = :id', { id })
			.getOne();

		const data = category ? [category] : [];

		return res.status(200).json({ data });
	} catch (error) {
		console.log('Error occurred in getCategoryById %s', error.message || error.stack);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
};
