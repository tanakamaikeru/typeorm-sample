import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'db',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'db',
  synchronize: true,
  logging: true,
  entities: [User],
  migrations: [],
  subscribers: [],
});
