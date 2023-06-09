import mongoose from 'mongoose'

const dataSchema = new mongoose.Schema({
  collectionName: {
    type: String,
    unique: true,
    required: true
  },
  config: {
    type: Array,
    required: true
  },
  axes: {
    type: Object,
    required: true
  },
  description: {
    type: String,
    unique: true,
    required: true
  }
})
export const DataModel = mongoose.model('DataSettings', dataSchema)
