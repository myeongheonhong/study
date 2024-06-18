import { Router } from 'express';
import searchController from '../controllers/searchController';

const router: Router = Router();

router.get('/', searchController.searchItem);

export default router;
