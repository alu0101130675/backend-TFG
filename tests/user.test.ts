import mongoose from 'mongoose'
import { server } from '../src'
import { UserModel } from '../src/models/user'
import { api } from './helper'
import bcrypt from 'bcrypt'

describe('user tests', () => {
  test('response is return as json', async () => {
    await api.get('/user/correo@gm/1234')
      .expect(200)
      .expect('Content-type', /application\/json/)
  })
  test('response is return as json', async () => {
    const response = await api.get('/user/correo@gm/1234')
    expect(response.body).toEqual({ response: 'it is not in database' })
  })
  test('creating a new user', () => {
    beforeEach(async () => {
      await UserModel.deleteMany({})
      const saltRounds = 10
      const passwordHash = await bcrypt.hash('prueba', saltRounds)
      const newUser = new UserModel({ email: 'email@gmail.com', password: passwordHash })
      await newUser.save()
    })
  })
})

afterAll(() => {
  server.close()
  mongoose.connection.close()
    .then(() => console.log('connecition closed succesfuly'))
    .catch((err) => console.error(err))
})
