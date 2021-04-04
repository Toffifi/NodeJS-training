import { Router } from 'express';

import { create, get, getAll, update, remove } from '../controllers/categories';

const createCategoryRoutes = (router: Router) => {
  router.get('/categories', getAll);
  router.get('/categories/:id', get);
  router.post('/categories', create);
  router.put('/categories', update);
  router.delete('/categories/:id', remove);
};

export default createCategoryRoutes;
