const mongoose = require('mongoose');
let db = require('../db')

let Schema = mongoose.Schema

let questionSchema = new Schema({
    title: {type: String, required: true},
    details: {type:String, required: true},
    score: {type: Number, default: 0},
    poster: {type: Schema.Types.ObjectId, ref: 'User'},
    listGiveScore: [{type: Schema.Types.ObjectId, ref: 'User'}],
    listAnswer: [{type: Schema.Types.ObjectId, ref: 'User'}],
    viewCount: {type: Number, default: 0}
}, {
  timestamps: true
})

module.exports = mongoose.model('Question', questionSchema)
