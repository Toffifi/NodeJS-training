import dotenv from 'dotenv';
import express from 'express';

import { initialize as initializeMongoClient } from './data/makeupStoreClient';
import router from './routes';

dotenv.config();

const PORT: string = process.env.PORT || '3000';
const app: express.Express = express();
initializeMongoClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}`);
});
