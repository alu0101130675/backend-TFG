import mongoose from 'mongoose'
import validator from 'validator'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
    validate: {
      validator: (email: string) => validator.isEmail(email),
      message: 'Invalid email address'
    }
  },
  password: {
    type: String,
    require: true
  },
  role: {
    type: String,
    require: true,
    default: 'client'
  }

})
export const UserModel = mongoose.model('Usuario', userSchema)
/* const user = new UserModel({
  email: 'example@gmail.co',
  password: '1234566'
}) */
