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
    type: String,
    require: true,
    default: false
  },
  link: String,
  expirationDate: Date

})
export const Initiative = mongoose.model('Iniciativa', userSchema)
