import { config } from 'dotenv';
import { resolve } from 'path';

const path = process.env.NODE_ENV === 'production' ? resolve('.env.production') : resolve('.env.development');

config({
	path,
});

export interface IConfig {
	databaseOptions: {
		name: string;
		password: string;
		user: string;
		host: string;
		port: number;
	};

	serverOptions: {
		PORT: number | string;
	};

	common: {
		JWT_SECRET: string;
	};
}

export const Config: IConfig = {
	databaseOptions: {
		host: process.env.DB_HOST || '127.0.0.1',
		port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
		name: process.env.DB_NAME || 'shop',
		password: process.env.DB_PASSWORD || 'postgres',
		user: process.env.DB_USER || 'postgres',
	},

	serverOptions: {
		PORT: process.env.PORT || 3344,
	},

	common: {
		JWT_SECRET: process.env.JWT_SECRET || 'SECRET',
	},
};
