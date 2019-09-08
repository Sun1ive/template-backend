import { Config } from '../src/config';
import { resolve } from 'path';
import { readFileSync, read } from 'fs';
import { Category } from '../src/models/category.entity';
import { Connection, createConnection, getConnection } from 'typeorm';
import { Asset } from '../src/models/asset.entity';
import { Product } from '../src/models/product.entity';

export interface IProduct {
  name: string;
  categoryId: string;
  price: number;
}

export interface ICategory {
  name: string;
  id: string;
}

describe('testing database models', () => {
  let connection: Connection | undefined;
  let filteredCategories: Array<ICategory>;
  let products: Array<IProduct>;

  beforeAll(async () => {
    connection = await createConnection({
      database: Config.databaseOptions.name,
      type: 'postgres',
      password: Config.databaseOptions.password,
      username: Config.databaseOptions.user,
      host: Config.databaseOptions.host,
      entities: [Category, Product, Asset],
      logger: 'debug',
      logging: true,
      synchronize: true
    });

    filteredCategories = JSON.parse(
      readFileSync(resolve('tests/mocks/categories.json'), 'utf8')
    );

    products = JSON.parse(
      readFileSync(resolve('tests/mocks/products.json'), 'utf8')
    );

    await connection.getRepository(Category).delete({});
    await connection.getRepository(Product).delete({});
  });

  afterAll(async () => {
    if (connection) {
      await connection.close();
    }
  });

  test('should has connection', () => {
    expect(connection).not.toBeUndefined();
  });

  test('should create category entity', async () => {
    const connection = getConnection();

    const res = await connection
      .createQueryBuilder()
      .from(Category, 'c')
      .select()
      .getMany();

    expect(res.length).toBe(0);

    await connection
      .createQueryBuilder()
      .insert()
      .into(Category)
      .values(filteredCategories)
      .execute();

    const res1 = await connection
      .createQueryBuilder()
      .from(Category, 'c')
      .select(['c.id', 'c.name'])
      .getMany();

    expect(res1.length).toBe(filteredCategories.length);
  });

  test('should create product entity', async () => {
    const connection = getConnection();
    const categoryRepo = connection.getRepository(Category);
    const prodRepo = connection.getRepository(Product);

    const values = products.map(prod =>
      prodRepo.create({
        name: prod.name,
        price: prod.price,
        category: categoryRepo.create({
          id: prod.categoryId
        })
      })
    );

    await connection
      .createQueryBuilder()
      .insert()
      .into(Product)
      .values(values)
      .execute();
  });
});
