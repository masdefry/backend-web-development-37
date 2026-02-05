import { Router } from 'express';
import { menuController } from '../controllers/menu.controller';

const router = Router();

router.get('/', menuController.getAll);
router.get('/:id', menuController.getById);

export default router;
