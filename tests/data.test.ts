import mongoose from 'mongoose'
import { server } from '../src'
import { DataModel } from '../src/models/data'
import { api } from './helper'
beforeAll(async () => {
  await DataModel.deleteMany({})
  const newDataModel = new DataModel({
    axes: { axeX: ['uno', 'dos', 'tres'], axeY: ['uno', 'dos', 'cinco', 'tres'] },
    collectionName: 'nombre',
    config: [['uno', 'dos', 'graficoBarras']]
  })
  await newDataModel.save()
})
describe('DataModel tests', () => {
  test('initiative response is return as json', async () => {
    await api.get('/user/correo@gm/prueba')
      .expect(200)
      .expect('Content-type', /application\/json/)
  })
  test('configFile has to be equal to 1', async () => {
    const response = await api.get('/data/configFiles')
    expect(response.body.length).toEqual(1)
  })
  test('configFile has axes', async () => {
    const response = await api.get('/data/axes/nombre')
    expect(response.body.axes.axeX).toContain('uno')
    expect(response.body.axes.axeY).toContain('cinco')
  })
})

afterAll(async () => {
  await DataModel.deleteMany({})
  server.close()
  mongoose.connection.close()
    .then(() => console.log('connecition closed succesfuly'))
    .catch((err) => console.error(err))
})
