import { Router } from 'express';

import createCategoryRoutes from './categories';
import createItemRoutes from './items';

const router: Router = Router();

createItemRoutes(router);
createCategoryRoutes(router);

export default router;
