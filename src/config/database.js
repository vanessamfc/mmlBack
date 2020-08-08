module.exports = {
  username: process.env.DB_USER || 'vanessa',
  password: process.env.DB_PASSWORD || 'docker',
  database: process.env.DB_DATABASE || 'my_movie_list',
  host: process.env.DB_HOST || '127.0.0.1',
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
