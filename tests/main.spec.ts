import { ServerBuilder } from '../src/factories/server';
import { Express } from 'express-serve-static-core';

describe('Test server factory', () => {
  let server: Express | undefined = undefined;

  test('should create base instance', () => {
    expect(server).toBeUndefined();
    expect(typeof server).toEqual('undefined');

    server = new ServerBuilder().build();

    expect(server).not.toBeUndefined();
    expect(typeof server).toEqual('function');
  });
});
