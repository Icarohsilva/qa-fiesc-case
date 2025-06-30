// backend/src/routes/auth.js
import { Router } from 'express';
import { login, registrar } from '../controllers/auth.controller.js';
const router = Router();
router.post('/login', login);
router.post('/registrar', registrar);
export default router;