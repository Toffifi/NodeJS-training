import { Router } from 'express';
import { getAll, create, remove, get, update } from '../controllers/categories';

const router: Router = Router();

router.get('/categories', getAll);
router.get('/categories/:id', get);
router.post('/categories', create);
router.put('/categories/:id', update);
router.delete('/categories/:id', remove);

export default router;
