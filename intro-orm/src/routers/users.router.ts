import { Router } from 'express';
import { usersController } from '../controllers/users.controller';

const usersRouter = Router();

usersRouter.get('/', usersController.get);
usersRouter.post('/', usersController.create);

export default usersRouter;