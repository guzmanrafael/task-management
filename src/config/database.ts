import { DataSource } from "typeorm";
import { Task } from "../models/Task";

export default new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "password",
  database: "todo",
  synchronize: true,
  logging: false,
  entities: [Task],
  subscribers: [],
  migrations: [],   
});