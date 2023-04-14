import { Request, Response, NextFunction } from 'express'
import mongoose, { Schema } from 'mongoose'
import { DataModel } from '../models/data'

export function postData (request: Request, response: Response, next: NextFunction): void {
  const body = request.body
  const { collectionName } = request.params
  const { documentData, config, axes } = body
  const dataSettings = new DataModel({ collectionName, config, axes })
  dataSettings.save()
    .then(() => {
      const thingSchema = new Schema({}, { strict: false, autoIndex: false, _id: false })
      const Data = mongoose.model(collectionName, thingSchema, collectionName)
      const documentsToInsert = documentData.map((row: any) => {
        const document = new Data(row)
        return document
      })
      Data.bulkSave(documentsToInsert).then((d) => response.send(d)).catch(err => next(err))
    }).catch(err => next(err))
}
export function getFileNames (request: Request, response: Response, next: NextFunction): void {
  DataModel.find().select('collectionName -_id')
    .then((d) => response.send(d))
    .catch(err => next(err))
}
export function getConfigFile (request: Request, response: Response, next: NextFunction): void {
  const name = request.params.name
  const idFlag = request.params.idFlag
  if (idFlag === 'true') {
    DataModel.findOne({ collectionName: name })
      .then((d) => response.send(d))
      .catch(err => next(err))
  } else {
    DataModel.findOne({ collectionName: name }).select('config -_id')
      .then((d) => response.send(d))
      .catch(err => next(err))
  }
}
export function getAxes (request: Request, response: Response, next: NextFunction): void {
  const name = request.params.name
  DataModel.findOne({ collectionName: name }).select('axes -_id')
    .then((d) => response.send(d))
    .catch(err => next(err))
}
export function getDataByFileName (request: Request, response: Response, next: NextFunction): void {
  const name = request.params.name
  mongoose.connection.collection(name, { strict: true })
    .find({}, { projection: { _id: 0 } })
    .toArray()
    .then(documents => response.send(documents))
    .catch(err => next(err))
}
export function getConfigFileNames (request: Request, response: Response, next: NextFunction): void {
  DataModel.find({}).then(d => response.send(d)).catch((e) => next(e))
}
export function deleteFiles (request: Request, response: Response, next: NextFunction): void {
  const name = request.params.name
  const id = request.params.id
  DataModel.findByIdAndDelete(id)
    .then(() => {
      mongoose.connection.dropCollection(name)
        .then((res) => {
          mongoose.connection.deleteModel(name)
          response.send({ message: 'deleted successfuly' })
        })
        .catch(e => next(e))
    }).catch(e => next(e))
}
export function updateConfigFile (request: Request, response: Response, next: NextFunction): void {
  const id = request.params.id
  const body = request.body
  DataModel.findByIdAndUpdate(id, { config: body })
    .then((d) => response.send(d))
    .catch(e => next(e))
}
