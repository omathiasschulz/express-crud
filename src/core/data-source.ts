import 'reflect-metadata';
import { DataSource } from 'typeorm';

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS } = process.env;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASS,
  synchronize: false, // cria automaticamente o esquema
  logging: false,
  entities: ['src/modules/**/entities/*.entity.ts'],
  migrations: ['src/migrations/*.migration.ts'],
});
