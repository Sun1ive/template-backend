import { ServerBuilder } from './factories/server';
import { cpus } from 'os';
import { pid } from 'process';
import cluster from 'cluster';
import { Server } from 'http';

function buildServer(port: number | string = 3001): Server {
  const app = new ServerBuilder()
    .addCompression()
    .addCors()
    .addLogger('dev')
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
  buildServer(3003);
}
