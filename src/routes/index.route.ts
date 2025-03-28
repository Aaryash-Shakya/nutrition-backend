import express, { Request, Response } from 'express';

const router = express.Router();

import authRoutes from './auth.route';
import foodRoutes from './food.route';
import userRoutes from './user.route';
import adminRoutes from './admin.route';

/** GET /health-check - Check service health */
router.get('/health-check', (req: Request, res: Response) =>
	res.send({ msg: 'OK' })
);

router.use('/auth', authRoutes);
router.use('/f', foodRoutes);
router.use('/user', userRoutes);
router.use('/admin', adminRoutes);

export default router;
