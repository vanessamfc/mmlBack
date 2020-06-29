import { Request, Response } from 'express';
import * as Yup from 'yup';
import axios from 'axios';
import Movies from '../models/Movies';

class MoviesController {
  async store(req: Request, res: Response) {
    const schema = Yup.object().shape({
      movieId: Yup.string().required(),
      status: Yup.mixed().oneOf(['WATCHED', 'PLAN_TO_WATCH']),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }
    const { userId } = req;
    const { movieId, status } = req.body;

    const { data } = await axios.get(
      `http://www.omdbapi.com/?i=${movieId}&apikey=8efc0c42`
    );

    const { Title, Year, Genre, Poster } = data;

    const movie = { Title, Year, Genre, Poster };

    const findMovieInList = await Movies.findOne({
      where: { movieId, userId },
    });

    if (findMovieInList) {
      return res.json({ message: 'movie already added' });
    }

    const addMovie = await Movies.create({
      movieId,
      status,
      movie,
      userId,
    });

    return res.json(addMovie);
  }

  async update(req: Request, res: Response) {
    const schema = Yup.object().shape({
      status: Yup.mixed().oneOf(['WATCHED', 'PLAN_TO_WATCH']),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }
    const { userId } = req;
    const { status } = req.body;
    const { movieId } = req.params;

    const findMovieInList = await Movies.findOne({
      where: { userId, movieId },
    });

    if (!findMovieInList) {
      return res.status(400).json({ message: 'user or movie not found' });
    }

    const [, [changeMovieStatus]] = await Movies.update(
      { status },
      {
        where: { userId, movieId },
        returning: true,
      }
    );

    return res.json(changeMovieStatus);
  }

  async delete(req: Request, res: Response) {
    const schema = Yup.object().shape({});

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }
    const { userId } = req;
    const { movieId } = req.params;

    const findMovieInList = await Movies.findOne({
      where: { userId, movieId },
    });

    if (!findMovieInList) {
      return res.status(400).json({ message: 'user or movie not found' });
    }

    const deletedMovie = await Movies.destroy({
      where: { userId, movieId },
    });

    return res.status(200);
  }
}
export default new MoviesController();
