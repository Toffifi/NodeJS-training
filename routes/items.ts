import { Router } from 'express';

import { create, get, getAll, remove, update } from '../controllers/items';
import { PostItemSchema, PutItemSchema } from '../validation/items';
import validate from '../validation/middleware';

const createItemRoutes = (router: Router) => {
  router.get('/items', getAll);
  router.get('/items/:id', get);
  router.post('/items', validate(PostItemSchema), create);
  router.put('/items', validate(PutItemSchema), update);
  router.delete('/items/:id', remove);
};

export default createItemRoutes;
