import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeAdmin } from '../middleware/authorizeAdmin.js';
import {
  list,
  listWithAirports,
  listAirports,
  create,
  update,
} from '../controllers/cityController.js';

const router = Router();
router.use(authenticate);

router.get('/', list);
router.get('/with-airports', listWithAirports); // antes que cualquier /:id
router.get('/:id/airports', listAirports);
router.post('/', authorizeAdmin, create);
router.put('/:id', authorizeAdmin, update);

export default router;