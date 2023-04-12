import mongoose from 'mongoose'
import validator from 'validator'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: (email: string) => validator.isEmail(email),
      message: 'Invalid email address'
    }
  },
  location: {
    type: String,
    required: true
  },
  validated: {
    type: Boolean,
    required: true,
    default: false
  },
  link: String,
  active: {
    type: Boolean,
    required: true,
    default: false
  },
  ComunidadAutonoma: String,
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  city: String,
  postCode: Number,
  contact: String,
  road: String,
  initiativeName: {
    type: String,
    required: true
  },
  contacto: String
}
)
export const Initiative = mongoose.model('Iniciativa', userSchema)
