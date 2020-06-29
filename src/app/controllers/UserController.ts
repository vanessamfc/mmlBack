import { Request, Response } from 'express';
import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req: Request, res: Response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required().email(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const { id, name, email } = req.body;

    const emailAlreadyExist = await User.findOne({
      where: {
        email,
      },
    });

    if (emailAlreadyExist) {
      return res.json({ error: 'email already in use' });
    }

    await User.create(req.body);

    return res.json({ id, name, email });
  }

  async update(req: Request, res: Response) {
    const schema = Yup.object().shape({
      name: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }
    const { id } = req.params;

    const { name } = req.body;

    const findUser = await User.findOne({
      where: {
        id,
      },
    });
    if (!findUser) {
      return res.json({ message: 'user not found' });
    }

    const [, [updatedUser]] = await User.update(
      { name },
      { where: { id }, returning: true }
    );

    return res.json(updatedUser);
  }
}
export default new UserController();
