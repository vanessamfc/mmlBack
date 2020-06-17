import express from 'express';
import routes from './app/routes/routes';
import 'dotenv';
import './database';

class App {
  server = express();

  constructor() {
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App();
