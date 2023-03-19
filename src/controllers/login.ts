import { UserModel } from '../models/user'
import { sign } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
// A lo mejor hay que aplicar un try catch aqui en el bcryp compares, mirar como que otra vez con promises
export async function login (request: Request, response: Response, next: NextFunction): Promise<void> {
  const body = request.body
  const { email, password } = body
  try {
    const user = await UserModel.findOne({ email })
    // A LO MEJOR AQUI HAY QUE COMPROBAR SI VIENE UN STRING O NO PORQUE CON NUBER U OTROS HAY QUE MIRAR QUE HACE EL SERVER
    if (user == null) {
      response.send({ message: 'incorrect password or user ' })
      return
    } else {
      const correctPassword = await bcrypt.compare(password, user.password as string)
      if (correctPassword) {
        const tokenForUser = { email: user.email }
        if (process.env.SECRET != null) {
          const token = sign(tokenForUser, process.env.SECRET)
          const logedUser = { token }
          response.send(logedUser)
          return
        } else throw new Error('SECRET is not initialized')
      }
      response.send({ message: 'incorrect password or user ' })
    }
  } catch (error) {
    next(error)
  }
}
