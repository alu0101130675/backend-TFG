import { Request, Response, NextFunction } from 'express'
import mongoose, { Schema } from 'mongoose'
import { DataModel } from '../models/data'
import { WeighingModel } from '../models/weighing'

export function postData (request: Request, response: Response, next: NextFunction): void {
  const body = request.body
  const { collectionName } = request.params
  const { documentData, config, axes, description } = body
  const dataSettings = new DataModel({ collectionName, config, axes, description })
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
    DataModel.findOne({ collectionName: name }).select('config description -_id')
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
  DataModel.findByIdAndUpdate(id, body)
    .then((d) => response.send(d))
    .catch(e => next(e))
}

export function weighing (request: Request, response: Response, next: NextFunction): void {
  const body = request.body
  const { weighing } = body
  const weighingToSave = new WeighingModel({ weighing })
  weighingToSave.save()
    .then((res) => response.send({ message: 'weighing added successfuly' }))
    .catch(err => next(err))
}

export function getWeighing (request: Request, response: Response, next: NextFunction): void {
  WeighingModel.findOne()
    .then(d => {
      const res = d ?? 'empty'
      response.send(res)
    })
    .catch(err => next(err))
}

export function updateWeighing (request: Request, response: Response, next: NextFunction): void {
  const body = request.body
  WeighingModel.findOneAndUpdate({}, body)
    .then(d => response.send({ message: 'update successfuly' }))
    .catch(err => next(err))
}

export function updateCollectionName (request: Request, response: Response, next: NextFunction): void {
  const name = request.params.name
  const id = request.params.id
  const collectionName = request.params.newName
  const description = request.body?.description ?? ''
  DataModel.findByIdAndUpdate({ _id: id }, { collectionName, description }, { new: true })
    .then(() => {
      if (collectionName !== name) {
        mongoose.connection.collection(name).rename(collectionName)
          .then().catch(e => next(e))
      }
      response.send({ message: 'Updated' })
    }).catch(e => next(e))
}
export function getDescription (request: Request, response: Response, next: NextFunction): void {
  const id = request.params.id
  DataModel.findById(id).select('description -_id')
    .then((res) => {
      (res != null)
        ? response.send(res)
        : response.send({ message: ' not found' })
    }).catch(e => next(e))
}
