import express from 'express'
import { createUser, findUserByIdAndPassword } from '../controllers/user'
const userRouter = express.Router()
/* userRouter.get('/', (req, res) => {
  res.send(diaryServices.diaryWihoutSensitiveInfo())
})
 userRouter.post('/', (req, res) => {
  const { date, visibility, comment } = req.body
  const newDiaryEntry = diaryServices.addEntry(
    {
      date,
      visibility,
      comment
    }
  )
  res.json(newDiaryEntry)
}) */
userRouter.get('/user/:email/:password', findUserByIdAndPassword) // mirar si hay que pasarl next aqui o estando en finduser ta bien
userRouter.post('/user', createUser) // mirar si hay que pasarl next aqui o estando en finduser ta bien

export default userRouter
