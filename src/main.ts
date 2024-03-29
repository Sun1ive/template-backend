import 'reflect-metadata';

import { ServerBuilder } from './factories/server';
import { Config } from './config';
import { cpus } from 'os';
import { pid } from 'process';
import { Server } from 'http';
import cluster from 'cluster';
import { initDB } from './db/connection';
import { router as categoryRouter } from './routes/categories';
import { router as productRouter } from './routes/products';
import { seedDatabase } from './db/init.db';

function buildServer(port: number | string = 3001): Server {
	const app = new ServerBuilder()
		.addCompression()
		.addCors()
		.addLogger('dev')
		.addRoute('/categories', categoryRouter)
		.addRoute('/products', productRouter)
		.build()
		.listen(port, () => console.log('Server with pid %s running at port %s', pid, port));

	return app;
}

(async () => {
	if (process.env.NODE_ENV === 'production') {
		if (cluster.isMaster) {
			await initDB();
			await seedDatabase();
			for (let i = 0; i < cpus().length - 1; i++) {
				const worker = cluster.fork();
				worker.on('exit', () => {
					console.log('Worker with pid %s crashed', worker.process.pid);
					cluster.fork();
				});
			}
		}

		if (cluster.isWorker) {
			await initDB();
			process.on('unhandledRejection', console.error);
			buildServer(Config.serverOptions.PORT);
		}
	} else {
		await initDB();
		await seedDatabase();
		buildServer(Config.serverOptions.PORT);
	}
})();
