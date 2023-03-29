import express from 'express'
import { deleteInitiative, getInitiative, getInitiativeByFilter, postInitiative, updateInitiative } from '../controllers/initiative'
import { adminCheck } from '../middleware/adminCheck'
import { userExtractor } from '../middleware/userExtractor'

export const initiativeRouter = express.Router()
initiativeRouter.post('/', userExtractor, postInitiative)
initiativeRouter.get('/', getInitiative)
initiativeRouter.get('/:ComunidadAutonoma/:active?', getInitiativeByFilter) // mirar si hay que pasarl next aqui o estando en finduser ta bien
initiativeRouter.patch('/', userExtractor, adminCheck, updateInitiative)
initiativeRouter.delete('/', userExtractor, adminCheck, deleteInitiative)
