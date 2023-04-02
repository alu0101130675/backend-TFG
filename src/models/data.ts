import mongoose from 'mongoose'

const dataSchema = new mongoose.Schema({
  collectionName: String,
  config: Array
})
export const DataModel = mongoose.model('DataSettings', dataSchema)
