import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    lowercase: true,
    unique: true
  },
  phone: {
    type: String
  },
  password: {
    type: String,
    require: true
  },
  cpf: {
    type: String,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

const User = mongoose.model('User', UserSchema)

export { User }
