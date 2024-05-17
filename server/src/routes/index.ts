import { Router } from 'express';
import { default as AuthRouter } from './authRouter';

const router: Router = Router();

router.use('/auth', AuthRouter);

export default router;
