import { Router } from 'express';
import UserController from '../controllers/UserController';
import SessionController from '../controllers/SessionController';
import auth from '../middlewares/auth';

const routes = Router();

interface Users {
  name: string;
  email: string;
}

routes.post('/session', SessionController.store);

routes.post('/user', UserController.store);

routes.use(auth);

routes.get('/pvt', (req, res) => {
  res.json({ msg: 'hello pvt' });
});

export default routes;
