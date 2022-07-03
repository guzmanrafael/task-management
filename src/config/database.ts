import { DataSource } from 'typeorm';
import { Task } from '../models/Task';

export default new DataSource({
  type: 'postgres',
  host: process.env.HOST,
  port: 5432,
  username: process.env.DBUSERNAME,
  password: process.env.DBPASSWORD,
  database: process.env.DATABASE,
  synchronize: true,
  logging: false,
  entities: [Task],
  subscribers: [],
  migrations: []
});
