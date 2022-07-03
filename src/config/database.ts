import { DataSource } from 'typeorm';
import { Task } from '../models/Task';
import { User } from '../models/User';

export default new DataSource({
  type: 'postgres',
  host: process.env.HOST,
  port: 5432,
  username: process.env.DBUSERNAME,
  password: process.env.DBPASSWORD,
  database: process.env.DATABASE,
  synchronize: true,
  logging: false,
  entities: [Task, User],
  subscribers: [],
  migrations: []
});
