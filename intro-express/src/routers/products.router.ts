import { Router } from 'express';
import { productsController } from '../controllers/products.controller';
import { testMiddleware } from '../middlewares/test.middleware';

const route = Router();

route.get('/', testMiddleware, testMiddleware, productsController.get);
route.post('/', testMiddleware, productsController.create);
route.put('/:productId', productsController.update);
route.delete('/:productId', productsController.delete);

export default route;
