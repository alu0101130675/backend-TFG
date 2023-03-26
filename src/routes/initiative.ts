import express from 'express'
import { getInitiative, getInitiativeByFilter, postInitiative, updateInitiative } from '../controllers/initiative'
import { userStractor } from '../middleware/userExtractor'

export const initiativeRouter = express.Router()
initiativeRouter.post('/', userStractor, postInitiative)
initiativeRouter.get('/', getInitiative)
initiativeRouter.get('/:ComunidadAutonoma/:active', getInitiativeByFilter) // mirar si hay que pasarl next aqui o estando en finduser ta bien
initiativeRouter.patch('/', updateInitiative) // mirar si hay que pasarl next aqui o estando en finduser ta bien
