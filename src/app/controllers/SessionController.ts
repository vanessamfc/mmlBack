import { Request, Response } from 'express';
import User from '../models/User'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

class SessionController {
  async store(req: Request, res: Response) {

    const { email, password } = req.body

    const user = await User.findOne({
      where: {
        email
      }
    })
    if (!user) {
      return res.status(400).json({ msg: 'error' })
    }
    const verification = await bcrypt.compare(password.toString(), user.password_hash);

    if (!verification) {
      return res.status(400).json({ msg: "erro" })
    }

    const token = jwt.sign({ id: user.id }, 'shhhhh', { expiresIn: '7d' });
    console.log(user?.get())
    res.json({ token })
  }
}
export default new SessionController()