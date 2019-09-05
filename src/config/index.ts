import { config } from 'dotenv';
import { resolve } from 'path';
const path =
  process.env.NODE_ENV === 'production'
    ? resolve('.env.production')
    : resolve('.env.development');

config({
  path
});

export interface IConfig {
  serverOptions: {
    port: number;
  };
}

export const Config: IConfig = {
  serverOptions: {
    port: process.env.SERVER_PORT ? +process.env.SERVER_PORT : 3003
  }
};
