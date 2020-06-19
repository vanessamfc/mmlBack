import { Router } from 'express';
import UserController from '../controllers/UserController';
import SessionController from '../controllers/SessionController';
import MoviesController from '../controllers/MoviesController';
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

routes.put('/user/:id', UserController.update);
routes.delete('/user/:id', MoviesController.delete);

routes.post('/movies', MoviesController.store);
routes.put('/movies/:movieId', MoviesController.update);
routes.delete('/movies/:movieId', MoviesController.delete);

export default routes;
