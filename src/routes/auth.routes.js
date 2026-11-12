import { Router } from 'express';
import { testAuth } from '../controllers/auth.controller.js';

const router = Router();

router.get('/', testAuth);

export default router;

