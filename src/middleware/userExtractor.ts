import { NextFunction, Response, Request } from 'express'
import { verify } from 'jsonwebtoken'
export function userExtractor (request: Request, response: Response, next: NextFunction): void {
  const authorization = request.get('authorization') ?? ''
  if (authorization.toLocaleLowerCase().startsWith('bearer')) {
    if (process.env.SECRET == null) {
      throw new Error('SECRET is not initialized')
    }
    const token = authorization.substring(7)
    const decodeToken = verify(token, process.env.SECRET)
    if (typeof decodeToken === 'object') {
      request.body.email = decodeToken.email // add email property to request object
      request.body.role = decodeToken.role
      next()
    }
  }
}
