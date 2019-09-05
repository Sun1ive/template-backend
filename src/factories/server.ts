import express from 'express';
import { Express } from 'express-serve-static-core';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';

export type LoggerKeys = 'dev' | 'tiny' | 'common' | 'combined' | 'short';

export interface ServerBuilder {
  addCors(cors?: cors.CorsOptions): ServerBuilder;

  addCompression(): ServerBuilder;

  addLogger(type: LoggerKeys, opts?: morgan.Options): ServerBuilder;

  build(): Express;
}

export class ServerBuilder implements ServerBuilder {
  private _server: Express;

  public constructor() {
    this._server = express();
  }

  public addCors(): this {
    this._server.use(cors());

    return this;
  }

  public addCompression(): this {
    this._server.use(compression());

    return this;
  }

  public addLogger(type: LoggerKeys, opts?: morgan.Options): this {
    this._server.use(morgan(type, opts));

    return this;
  }

  public build(): Express {
    return this._server;
  }
}
