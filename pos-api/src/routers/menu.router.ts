import { Router } from 'express';
import { menuController } from '../controllers/menu.controller';
import { jwtVerify, roleVerify } from '../middlewares/auth.middleware';
import { JWT_TOKEN_SECRET_KEY } from '../configs/main.config';
import { createMenuValidator } from '../validators/menu.validator';
import { expressRequestValidation } from '../middlewares/express-request-validation.middleware';
import { multerUpload } from '../helpers/multer.helper';

const router = Router();

router.get('/', menuController.getAll);
router.get('/:id', menuController.getById);
router.post('/', 
    jwtVerify(JWT_TOKEN_SECRET_KEY!), 
    roleVerify(['ADMIN']), 
    multerUpload('src/uploads', 'IMG-MENU', ['jpg', 'png', 'jpeg', 'svg', 'webp'], 'memory').array('imagesMenu', 3),
    createMenuValidator, 
    expressRequestValidation,
    menuController.create
);

export default router;
