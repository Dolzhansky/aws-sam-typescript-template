import * as process from 'process';

//Redis
export const REDIS_HOST: string = process.env.REDIS_HOST || '127.0.0.1';
export const REDIS_PORT: number = +process.env.REDIS_PORT || 6379;
export const REDIS_USER: string = process.env.REDIS_USER;
export const REDIS_PASSWORD: string = process.env.REDIS_PASSWORD;
export const REDIS_DATABASE: number = +process.env.REDIS_DATABASE || 0;
const redis_environment = {
  host: REDIS_HOST,
  port: REDIS_PORT,
  username: REDIS_USER,
  password: REDIS_PASSWORD,
  db: REDIS_DATABASE,
};
export const REDIS = redis_environment;

export const JWT_KEY: string = process.env.JWT_KEY;