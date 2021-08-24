import 'reflect-metadata';
import dotenv from "dotenv";
dotenv.config();

import { createConnection, useContainer } from "typeorm";
import { Container } from 'typeorm-typedi-extensions';

/** Tell TypeORM to use the container provided by this lib to resolve it's dependencies. */
useContainer(Container);

import app from "./server";

createConnection()
  .then(async (connection) => {
    app.listen(process.env.PORT, () =>
      console.log(`Node.JS Server Listening on PORT ${process.env.PORT}`)
    );
  })
  .catch((error) => console.log(error));