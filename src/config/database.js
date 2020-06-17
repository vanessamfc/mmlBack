module.exports = {
  username: "vanessa",
  password: "docker",
  database: "my_movie_list",
  host: "127.0.0.1",
  dialect: "postgres",
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
