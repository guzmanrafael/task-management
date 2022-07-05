import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import database from './config/database';
import handleError from './middlewares/handleError';
import AuthRoutes from './routes/Auth.routes';
import TaskRoutes from './routes/Task.routes';
import helmet from 'helmet';
import compression from 'compression';
import cors from "cors";

const app = express();
const apiRoutes = express.Router();

app
.use(express.urlencoded({ extended: true }))
.use(express.json())
.use(cors())
.use(helmet())
.use(compression());

apiRoutes.options("*", cors());

apiRoutes.use("/auth", AuthRoutes);
apiRoutes.use("", TaskRoutes);

database
  .initialize()
  .then(() => console.log('Database connected'))
  .catch(console.error);

app.use('/api', apiRoutes);

app.use(handleError);

app.listen(3030, () => {
  console.log('App excute in port 3030');
});
