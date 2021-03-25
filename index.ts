import express from 'express';
import dotenv from 'dotenv';
import itemsRoutes from './routes/items';
import categoriesRoutes from './routes/categories';

dotenv.config();

const PORT: string = process.env.PORT || '3000';
const app: express.Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(itemsRoutes);
app.use(categoriesRoutes);

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}`);
});
