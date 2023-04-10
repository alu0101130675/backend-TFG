import { Request, Response, NextFunction } from 'express'
import { Initiative } from '../models/initiative'

export function postInitiative (request: Request, response: Response, next: NextFunction): void {
  const body = request.body
  const initiative = new Initiative(body)
  initiative.save()
    .then(() => response.send({ message: 'innitiative added' })
    ).catch(err => response.send(err))
}

export function getInitiative (request: Request, response: Response, next: NextFunction): void {
  Initiative.find({})
    .then((initiatives) => response.send(initiatives)
    ).catch(err => response.send(err))
}

export function getInitiativeByFilter (request: Request, response: Response, next: NextFunction): void {
  const params = request.params
  const validParams = Object.fromEntries(Object.entries(params).filter(([_, value]) => value !== 'Todas'))
  Initiative.find(validParams)
    .then((initiatives) => response.send(initiatives)
    ).catch(err => response.send(err))
}

export function updateInitiative (request: Request, response: Response, next: NextFunction): void {
  const body = request.body
  const { id, validated, active, initiativeName, link, contacto } = body
  Initiative.findOneAndUpdate({ _id: id }, { validated, active, initiativeName, link, contacto }, { new: true })
    .then((initiatives) => response.send(initiatives)
    ).catch(err => response.send(err))
}

export function deleteInitiative (request: Request, response: Response, next: NextFunction): void {
  const body = request.body
  const { id } = body
  Initiative.findOneAndRemove({ _id: id })
    .then((res) => response.send({ menssage: res })
    ).catch(err => response.send(err))
}
