import express from 'express'
import dotenv from 'dotenv'
import userRouter from './routes/user'
import { handleError } from './middleware/handleErrors'
import { notFound } from './middleware/notFound'
import { connectionDB } from './mongo'
import { initiativeRouter } from './routes/initiative'
import { routerLogin } from './routes/login'
dotenv.config()
connectionDB()
export const app = express()
app.use(express.json()) // middleware que transforma la requestAnimationFrame.boy a un json
const PORT = 3001

app.use('/', userRouter)
app.use('/login', routerLogin)
app.use('/initiative', initiativeRouter)

app.use(notFound)

// manejo de errores
app.use(handleError)

export const server = app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
