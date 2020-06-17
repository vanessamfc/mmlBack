import { Request, Response } from 'express';
import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req: Request, res: Response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required().email(),
      password: Yup.string().required().min(5),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const newUser = req.body;

    const { id, name, email } = await User.create(newUser);

    return res.json({ id, name, email });
  }
}
export default new UserController();
