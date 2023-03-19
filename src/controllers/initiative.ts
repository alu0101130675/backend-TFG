import { Request, Response, NextFunction } from 'express'
import { Initiative } from '../models/initiative'

export function postInitiative (request: Request, response: Response, next: NextFunction): void {
  const body = request.body
  const initiative = new Initiative(body)
  initiative.save()
    .then(() => response.send({ message: 'innitiative added' })
    ).catch(err => response.send(err))
}
