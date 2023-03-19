import express from 'express'
import { postInitiative } from '../controllers/initiative'
import { userStractor } from '../middleware/userExtractor'

export const initiativeRouter = express.Router()
initiativeRouter.post('/', userStractor, postInitiative)
