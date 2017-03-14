const mongoose = require('mongoose');
let db = require('../db')

let Schema = mongoose.Schema

let commentSchema = new Schema({
  comment: {type: String, required: true},
  poster: {type: Schema.Types.ObjectId, ref: 'User'},
  listComment: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
}, {
  timestamps: true
})

module.exports = mongoose.model('Comment', commentSchema)
