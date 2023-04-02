import { Request, Response, NextFunction } from 'express'
import mongoose, { Schema } from 'mongoose'
import { DataModel } from '../models/data'

export function postData (request: Request, response: Response, next: NextFunction): void {
  const body = request.body
  const { collectionName } = request.params
  const { documentData, config } = body
  const thingSchema = new Schema({}, { strict: false, autoIndex:false,_id:false })
  const Data = mongoose.model(collectionName, thingSchema, collectionName)
  const dataSettings = new DataModel({ collectionName, config })
  dataSettings.save().then(d => console.log(d)).catch(err => next(err))
  const documentsToInsert = documentData.map((row: any) => {
    const document = new Data(row)
    return document
  })
  Data.bulkSave(documentsToInsert).then((d) => response.send(d)).catch(err => next(err))
}
export function getFileNames (request: Request, response: Response, next: NextFunction): void {
  DataModel.find().select('collectionName -_id')
    .then((d) => response.send(d))
    .catch(err => next(err))
}
export function getConfigFile (request: Request, response: Response, next: NextFunction): void {
  const name = request.params.name
  console.log(name)
  DataModel.find({ collectionName: name }).select('config -_id')
    .then((d) => response.send(d))
    .catch(err => next(err))
}
export function getDataByFileName (request: Request, response: Response, next: NextFunction): void {
  const name = request.params.name
  console.log(name)
  mongoose.connection.collection(name, { strict: true })
  .find({}, {projection: {_id:0}})
  .toArray()
  .then(documents => response.send(documents))
  .catch(err => next(err))
}
