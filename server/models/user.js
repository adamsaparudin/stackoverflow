const mongoose = require('mongoose');
let db = require('../db')

let Schema = mongoose.Schema

let userSchema = new Schema({
  username: {type: String, unique: true, required: true},
  password: {type: String},
  email: {type: String},
  name: {type: String},
  bio: {type: String}
}, {
  timestamps: true
})

module.exports = mongoose.model('User', userSchema)
