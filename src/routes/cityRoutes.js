import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeAdmin } from '../middleware/authorizeAdmin.js';
import {
  list,
  listWithAirports,
  listAirports,
  getOne,
  create,
  update,
  remove,
} from '../controllers/cityController.js';

const router = Router();
router.use(authenticate);

router.get('/', list);
router.get('/with-airports', listWithAirports); // antes que cualquier /:id
router.get('/:id', getOne);
router.get('/:id/airports', listAirports);
router.post('/', authorizeAdmin, create);
router.put('/:id', authorizeAdmin, update);
router.delete('/:id', authorizeAdmin, remove);

export default router;