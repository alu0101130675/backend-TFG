import express from 'express'
import dotenv from 'dotenv'
import userRouter from './routes/user'
import { handleError } from './middleware/handleErrors'
import { notFound } from './middleware/notFound'
import { connectionDB } from './mongo'
import { initiativeRouter } from './routes/initiative'
import { routerLogin } from './routes/login'
import cors from 'cors'
import { dataRouter } from './routes/data'

dotenv.config()
const { PORT } = process.env
connectionDB()
export const app = express()
app.use(cors())
app.use(express.json({ limit: '10mb' })) // middleware que transforma la requestAnimationFrame.boy a un json
app.use('/', userRouter)
app.use('/login', routerLogin)
app.use('/initiative', initiativeRouter)
app.use('/data', dataRouter)

app.use(notFound)

// manejo de errores
app.use(handleError)

export const server = app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
