import dotenv from 'dotenv';
import express from 'express';
import { ValidationError } from 'express-json-validator-middleware';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import * as mongoClient from './data/makeupStoreClient';
import router from './routes';

const swaggerDocument = YAML.load('./swagger.yaml');

dotenv.config();

const PORT: string = process.env.PORT || '3000';
const app: express.Express = express();
mongoClient.initialize();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(
  (
    err: express.Errback,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (err instanceof ValidationError) {
      res.status(400).send('Bad Request');
      next();
    } else next(err);
  }
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app
  .listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}`);
  })
  .on('error', (err: Error) => {
    console.log(err.message);
    mongoClient.close();
  });
