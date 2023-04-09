import mongoose from 'mongoose'

const dataSchema = new mongoose.Schema({
  collectionName: {
    type: String,
    unique: true,
    require: true
  },
  config: {
    type: Array,
    require: true
  }
})
export const DataModel = mongoose.model('DataSettings', dataSchema)
