import { Router } from 'express';
import * as userController from '../controllers/userController.js';

const router = Router();

router.get('/', userController.list);
router.put('/:id/role', userController.updateRole);

export default router;