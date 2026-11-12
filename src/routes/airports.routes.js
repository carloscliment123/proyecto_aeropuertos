import { Router } from 'express';
import { getAirports } from '../controllers/airports.controller.js';

const router = Router();

router.get('/', getAirports);

export default router;

