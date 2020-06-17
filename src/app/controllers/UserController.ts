import { Request, Response, NextFunction } from 'express';
import User from '../models/User'

class UserController {
  async store(req: Request, res: Response) {

    const newUser = req.body

    const { id, name, email } = await User.create(newUser)

    res.json({ id, name, email })
  }
}
export default new UserController()