import { UserModel } from '../models/user'
import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'

export const findUserByIdAndPassword = (req: Request, res: Response, next: NextFunction): void => {
  const user = req.params

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
export function deleteUser (request: Request, response: Response, next: NextFunction): void {
  const body = request.body
  const { email } = body
  console.log('email', email)
  UserModel.findOneAndRemove({ email })
    .then((res) => response.send({ menssage: res })
    ).catch(err => response.send(err))
}
