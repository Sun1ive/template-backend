import { getConnection } from 'typeorm';
import { Category } from '../models/category.entity';

export const seedDatabase = async () => {
  const connection = getConnection();

  const categoryRepo = connection.getRepository(Category);
};
