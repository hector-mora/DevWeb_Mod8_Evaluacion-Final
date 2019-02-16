const mongoose = require('mongoose')

const Schema = mongoose.Schema

let UserSchema = new Schema({
  user: { type: String, required: true, unique: true },
  pass: { type: String, required: true },
  nombre: { type: String, required: true }
})

let UserModel = mongoose.model('usuarios', UserSchema)

module.exports = UserModel
