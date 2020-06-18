import Sequelize, { Model } from 'sequelize';

class Movies extends Model {
  movie_id!: string;

  movie!: any;

  status!: string;

  static initModel(sequelize: Sequelize.Sequelize) {
    this.init(
      {
        movieId: { field: 'movie_id', type: Sequelize.INTEGER },
        userId: Sequelize.INTEGER,
        movie: Sequelize.JSONB,
        status: Sequelize.ENUM('WATCHED', 'PLAN_TO_WATCH'),
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: { field: 'user_id', name: 'userId' },
      as: 'user',
    });
  }
}

export default Movies;
