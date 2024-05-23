import { Router } from 'express';

import authController from '../controllers/authController';

const router: Router = Router();

router.post('/login', authController.postLocalLogin);
router.post('/google', authController.postGoogleLogin);
router.post('/kakao', authController.postKakaoLogin);
router.post('/signup', authController.postLocalSignup);

export default router;
