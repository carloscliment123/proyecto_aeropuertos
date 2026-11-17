import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeAdmin } from '../middleware/authorizeAdmin.js';
import { list, getOne, create, update, remove } from '../controllers/airportController.js';

const router = Router();
router.use(authenticate);

router.get('/', list);
router.get('/:id', getOne);
router.post('/', authorizeAdmin, create);
router.put('/:id', authorizeAdmin, update);
router.delete('/:id', authorizeAdmin, remove);

export default router;