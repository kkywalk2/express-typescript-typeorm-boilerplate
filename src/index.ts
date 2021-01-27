import dotenv from 'dotenv'; dotenv.config()
import {createConnection} from "typeorm";

import app from './server';

createConnection().then(async connection => {
  app.listen(9000, () =>
    console.log('kkywalk2 App Listening on PORT 9000'),
  );
}).catch(error => console.log(error));