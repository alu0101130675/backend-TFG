import mongoose from 'mongoose'
import { server } from '../src'
import { UserModel } from '../src/models/user'
import { api } from './helper'
import bcrypt from 'bcrypt'

beforeAll(async () => {
  await UserModel.deleteMany({})
  const saltRounds = 10
  const passwordHash = await bcrypt.hash('prueba', saltRounds)
  const newUser = new UserModel({ email: 'correo@gmail.com', password: passwordHash })
  await newUser.save()
})
describe('user tests', () => {
  test('response is return as json', async () => {
    await api.get('/user/correo@gm/prueba')
      .expect(200)
      .expect('Content-type', /application\/json/)
  })
  test('response is return as json', async () => {
    const response = await api.get('/user/correo@gm/1234')
    expect(response.body).toEqual({ response: 'it is not in database' })
  })
})

afterAll(async () => {
  await UserModel.deleteMany({})
  server.close()
  mongoose.connection.close()
    .then(() => console.log('connecition closed succesfuly'))
    .catch((err) => console.error(err))
})
