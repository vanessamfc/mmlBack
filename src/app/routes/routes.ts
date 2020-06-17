import { Router } from "express";
import UserController from '../controllers/UserController'
import SessionController from '../controllers/SessionController'

const routes = Router();

interface Users {
  name: string;
  email: string;
}

const users: Users[] = [];


routes.post("/session", SessionController.store)

routes.post("/user", UserController.store)



export default routes;
