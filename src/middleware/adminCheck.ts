import { NextFunction, Response, Request } from 'express'
import { UserModel } from '../models/user'
export function adminCheck (request: Request, response: Response, next: NextFunction): void {
  const { email, role } = request.body
  if (role === 'admin') {
    UserModel.findOne({ email, role }).then((user) => {
      (user != null) ? next() : response.send({ message: 'can not acces' })
    }).catch((err) => next(err))
  } else {
    response.send({ message: 'can not acces' })
  }
}
