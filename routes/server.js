import { Router } from 'express';
import { getAll, create, remove, get, update } from '../controllers/items.js';

const router = Router();

router.get('/items', getAll);
router.get('/items/:id', get);
router.post('/items', create);
router.put('/items/:id', update);
router.delete('/items/:id', remove);

export default router;
