import mongoose from 'mongoose'
import { server } from '../src'
import { Initiative } from '../src/models/initiative'
import { api } from './helper'
beforeAll(async () => {
  await Initiative.deleteMany({})
  const newInitiative = new Initiative({ latitude: 12132, location: 'example Location', ComunidadAutonoma: 'canarias', email: 'prueba@gmail.com', longitude: 2323123, initiativeName: 'prueba' })
  await newInitiative.save()
})
describe('initiative tests', () => {
  test('initiative response is return as json', async () => {
    await api.get('/user/correo@gm/prueba')
      .expect(200)
      .expect('Content-type', /application\/json/)
  })
  test('initiative has a name,latitude,location,comunadad autonoma,email', async () => {
    const response = await api.get('/initiative')
    expect(response.body[0].initiativeName).toEqual('prueba')
    expect(response.body[0].latitude).toEqual(12132)
    expect(response.body[0].location).toEqual('example Location')
    expect(response.body[0].ComunidadAutonoma).toEqual('canarias')
    expect(response.body[0].email).toEqual('prueba@gmail.com')
    expect(response.body[0].longitude).toEqual(2323123)
  })
  test('Intiatives has to be equal to 1', async () => {
    const response = await api.get('/initiative')
    expect(response.body.length).toEqual(1)
  })
})

afterAll(async () => {
  await Initiative.deleteMany({})
  server.close()
  mongoose.connection.close()
    .then(() => console.log('connecition closed succesfuly'))
    .catch((err) => console.error(err))
})
