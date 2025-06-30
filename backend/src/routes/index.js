// backend/src/routes/index.js
import { Router } from 'express';
import authRoutes from './auth.js';
import cafesRoutes from './cafes.js';
import ingredientesRoutes from './ingredientes.js';
import pedidosRoutes from './pedidos.js';
import { validarToken } from '../middlewares/auth.js';
const router = Router();
router.use('/auth', authRoutes);
router.use('/ingredientes', validarToken, ingredientesRoutes);
router.use('/cafes', validarToken, cafesRoutes);
router.use('/pedidos', validarToken, pedidosRoutes);
export default router;