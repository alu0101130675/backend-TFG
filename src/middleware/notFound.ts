import { NextFunction, Response, Request } from 'express'
export function notFound (request: Request, response: Response, next: NextFunction): Response {
  return response.status(404).end()
}
