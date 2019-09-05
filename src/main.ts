import 'reflect-metadata';

import { ServerBuilder } from './factories/server';
import { Config } from './config';
import { cpus } from 'os';
import { pid } from 'process';
import { Server } from 'http';
import cluster from 'cluster';
import { initDB } from './db/connection';

function buildServer(port: number | string = 3001): Server {
  const app = new ServerBuilder()
    .addCompression()
    .addCors()
    .addLogger('dev')
    .addRoute('/test', (_, res) => res.send('eeee'))
    .build()
    .listen(port, () =>
      console.log('Server with pid %s running at port %s', pid, port)
    );

  return app;
}

if (process.env.NODE_ENV === 'production') {
  if (cluster.isMaster) {
    const cpusCount = cpus().length;
    for (let index = 0; index < cpusCount - 1; index++) {
      const worker = cluster.fork();

      worker.on('exit', () => {
        console.log('Worker with pid %s crashed', worker.process.pid);
        cluster.fork();
      });
    }
  }

  if (cluster.isWorker) {
    buildServer();
  }
} else {
  (async () => {
    buildServer(Config.serverOptions.PORT);

    await initDB();
  })();
}
