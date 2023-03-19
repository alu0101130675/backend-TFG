import { Router, Request, Response, NextFunction } from 'express'
import { login } from '../controllers/login'
export const routerLogin = Router()
routerLogin.post('/', (request: Request, response: Response, next: NextFunction) => {
  login(request, response, next).catch(err => next(err))
})
