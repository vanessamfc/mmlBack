import { Sequelize, Options, Model, ModelCtor } from 'sequelize';

import databaseConfig from '../config/database';
import User from '../app/models/User';

const models = [User];

class Database {
  public connection: Sequelize = new Sequelize(
    (databaseConfig as unknown) as Options
  );

  constructor() {
    this.init();
  }

  init() {
    models
      .map((model) => model.initModel(this.connection))
      .map(
        // @ts-ignore
        (model) => model.associate && model?.associate(this.connection.models)
      );
  }

  close() {
    this.connection.close();
  }
}

export default new Database();
