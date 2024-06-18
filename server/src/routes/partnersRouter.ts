import { Router } from 'express';
import partnersController from '../controllers/partnersController';
import authMiddleware from '../middlewares/authMiddleware';
import uploadMiddleware from '../middlewares/uploadMiddleware';

const router: Router = Router();

router.post(
  '/upload',
  authMiddleware.validateAccessToken,
  uploadMiddleware.partnersPortfolioMulter,
  partnersController.createPortfolio
);

router.get('/portfolios', authMiddleware.validateAccessToken, partnersController.getPortfolioList);

export default router;
