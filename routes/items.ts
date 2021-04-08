import { Router } from 'express';
import { ValidateFunction, Validator } from 'express-json-validator-middleware';

import { create, get, getAll, remove, update } from '../controllers/items';
import {
  GetItemSchema,
  PostItemSchema,
  PutItemSchema,
} from '../validation/items';

const { validate } = new Validator({ allErrors: true });

const createItemRoutes = (router: Router) => {
  router.get(
    '/items',
    validate({ body: GetItemSchema as ValidateFunction }),
    getAll
  );
  router.get('/items/:id', get);
  router.post(
    '/items',
    validate({ body: PostItemSchema as ValidateFunction }),
    create
  );
  router.put(
    '/items',
    validate({ body: PutItemSchema as ValidateFunction }),
    update
  );
  router.delete('/items/:id', remove);
};

export default createItemRoutes;
