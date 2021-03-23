import express from 'express';
import serverRoutes from './routes/server.js';

const PORT = process.env.PORT ?? 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(serverRoutes);

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}`);
});
