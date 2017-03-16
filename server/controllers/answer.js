let Answer = require('../models/answer')
let Question = require('../models/question')
let User = require('../models/user')

module.exports = {

  create: (req, res, next) => {
    let doc = new Answer(req.body)
    doc.save().then( (data) => {

      User.findByIdAndUpdate(data.poster,
      {$push: {"listAnswer": data._id}},
      function(err, user) {
        if(err) console.log(err);
        else console.log(user);
      })

      Question.findByIdAndUpdate(data.question,
      {$push: {"listAnswer": data._id}},
      function(err, question) {
        if(err) console.log(err);
        else console.log(question)
      })

      res.send(data)
    }).catch( (err) =>{
      res.send(err)
    })
  },

  upvote: (req, res, next) => {
    Answer.findById(req.params.id, (err, doc) => {
      if(doc.listGiveScore.indexOf(req.params.user) !== -1) {
        doc.score = doc.score + 1
        doc.listGiveScore.push(req.params.user)
        res.send("ok")
      } else {
        res.send("not ok")
      }
    })
  },

  downvote: (req, res, next) => {
    Answer.findById(req.params.id, (err, doc) => {
      if(doc.listGiveScore.indexOf(req.params.user) !== -1) {
        doc.score = doc.score - 1
        doc.listGiveScore.push(req.params.user)
        res.send("ok")
      } else {
        res.send("not ok")
      }
    })
  },

  read: (req, res, next) => {
    Answer.find({}).exec((err, docs) => {
        if(err) res.send(err)
        res.json(docs)
    })
  },

  update: (req, res, next) => {
    Answer.findById(req.params.id, (err, doc) => {
      if (err) res.send(err)
      else {
        doc.update(req.body, (error, data) => {
          if(error) res.send(error)
          else res.send(data)
        })
      }
    })
  },

  deleteAnswer: (req, res, next) => {
    Answer.remove({_id : req.params.id}, (err, doc) => {
      if (err) res.send(err)
      else res.send(doc)
    })
  }

}
