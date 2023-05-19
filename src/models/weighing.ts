import mongoose from 'mongoose'

const weighingSchema = new mongoose.Schema({
  weighing: {
    type: Object,
    required: true
  }
})
export const WeighingModel = mongoose.model('Ponderacion', weighingSchema)
