import "reflect-metadata";
import express from "express";
import database from "./config/database";
import handleError from "./middlewares/handleError";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

database
  .initialize()
  .then(() => console.log("Database connected"))
  .catch(console.error);

app.use(handleError);

app.listen(3030, () => {
  console.log("App excute in port 3030");
});