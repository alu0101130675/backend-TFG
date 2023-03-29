import express from 'express'
import { createUser, deleteUser, findUserByIdAndPassword, getRole } from '../controllers/user'
import { adminCheck } from '../middleware/adminCheck'
import { userExtractor } from '../middleware/userExtractor'
const userRouter = express.Router()

userRouter.get('/user/:email/:password', findUserByIdAndPassword) // mirar si hay que pasarl next aqui o estando en finduser ta bien
userRouter.post('/user', createUser) // mirar si hay que pasarl next aqui o estando en finduser ta bien
userRouter.get('/user/role', userExtractor, adminCheck, getRole)
userRouter.delete('/user', userExtractor, deleteUser)

export default userRouter
