import mongoose from 'mongoose'
import validator from 'validator'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    validate: {
      validator: (email: string) => validator.isEmail(email),
      message: 'Invalid email address'
    }
  },
  location: {
    type: String,
    require: true
  },
  validated: {
    type: Boolean,
    require: true,
    default: false
  },
  link: String,
  active: {
    type: Boolean,
    require: true,
    default: false
  },
  ComunidadAutonoma: String,
  latitude: Number,
  longitude: Number,
  city: String,
  postCode: Number,
  contact: String,
  road: String,
  initiativeName: {
    type: String,
    require: true,
  }
})
export const Initiative = mongoose.model('Iniciativa', userSchema)
