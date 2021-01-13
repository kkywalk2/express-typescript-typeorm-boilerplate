import app from './server';
import {createConnection} from "typeorm";

createConnection().then(async connection => {
  app.listen(9000, () =>
    console.log('kkywalk2 App Listening on PORT 9000'),
  );
}).catch(error => console.log(error));