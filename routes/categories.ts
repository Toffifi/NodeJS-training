import { Router } from 'express';
import { ValidateFunction, Validator } from 'express-json-validator-middleware';

import { create, get, getAll, remove, update } from '../controllers/categories';
import {
  GetCategorySchema,
  PostCategorySchema,
  PutCategorySchema,
} from '../validation/categories';

const { validate } = new Validator({ allErrors: true });

const createCategoryRoutes = (router: Router) => {
  router.get('/categories', getAll);
  router.get(
    '/categories/:id',
    validate({ body: GetCategorySchema as ValidateFunction }),
    get
  );
  router.post(
    '/categories',
    validate({ body: PostCategorySchema as ValidateFunction }),
    create
  );
  router.put(
    '/categories',
    validate({ body: PutCategorySchema as ValidateFunction }),
    update
  );
  router.delete('/categories/:id', remove);
};

export default createCategoryRoutes;
