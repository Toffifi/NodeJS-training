import { Router } from 'express';

import { create, get, getAll } from '../controllers/items';

const createItemRoutes = (router: Router) => {
  router.get('/items', getAll);
  router.get('/items/:id', get);
  router.post('/items', create);
  // router.put('/items/:id', update);
  // router.delete('/items/:id', remove);
};

export default createItemRoutes;
