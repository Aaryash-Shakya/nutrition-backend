import express, { Request, Response } from 'express';

const router = express.Router();

import authRoutes from './auth.route';

/** GET /health-check - Check service health */
router.get('/health-check', (req: Request, res: Response) =>
	res.send({ msg: 'OK' })
);

router.use('/auth', authRoutes);

export default router;
