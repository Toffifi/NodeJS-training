import dotenv from 'dotenv';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

import * as mongoClient from './data/makeupStoreClient';
import router from './routes';
import * as swaggerDocument from './swagger.json';

dotenv.config();

const PORT: string = process.env.PORT || '3000';
const app: express.Express = express();
mongoClient.initialize();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app
  .listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}`);
  })
  .on('error', (err: Error) => {
    console.log(err.message);
    mongoClient.close();
  });
