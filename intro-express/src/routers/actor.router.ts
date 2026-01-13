import { Router } from 'express';
import { actorController } from '../controllers/actor.controller';
const route = Router();

route.get('/', actorController.get);
route.post('/', actorController.create);

export default route;
