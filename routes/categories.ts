import { Router } from 'express';

import { create, get, getAll, remove, update } from '../controllers/categories';
import {
  PostCategorySchema,
  PutCategorySchema,
} from '../validation/categories';
import validate from '../validation/middleware';

const createCategoryRoutes = (router: Router) => {
  router.get('/categories', getAll);
  router.get('/categories/:id', get);
  router.post('/categories', validate(PostCategorySchema), create);
  router.put('/categories', validate(PutCategorySchema), update);
  router.delete('/categories/:id', remove);
};

export default createCategoryRoutes;
