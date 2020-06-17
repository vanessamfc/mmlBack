import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcrypt';

class User extends Model {

  id!: number;
  name!: string;
  email!: string;
  password_hash!: string;
  password!: string;


  static initModel(sequelize: Sequelize.Sequelize) {
    this.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async (user: User) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password.toString(), 8);
      }
    });


    return this;
  }
}

export default User

