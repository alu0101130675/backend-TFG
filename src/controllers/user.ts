import { UserModel } from '../models/user'
import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'

export const findUserByIdAndPassword = (req: Request, res: Response, next: NextFunction): void => {
  const user = req.params
  console.log(user)

  UserModel.findOne(user)
    .then(user => {
      user != null
        ? res.send(user)
        : res.send({ response: 'it is not in database' })
    })
    .catch(err => next(err))
}

export const createUser = (req: Request, res: Response, next: NextFunction): void => {
  const body = req.body
  const { email, password } = body
  const saltrounds = 10
  bcrypt.hash(password, saltrounds)
    .then(passwordHash => {
      const newUser = new UserModel({ email, password: passwordHash })
      newUser.save().then(() => res.send('succes')).catch(err => next(err))
    }).catch(err => next(err))
}
export const getRole = (req: Request, res: Response, next: NextFunction): void => {
  res.send({ message: 'admin' })
}
