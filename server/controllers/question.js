let Question = require('../models/question')
let User = require('../models/user')

module.exports = {

  create: (req, res, next) => {
    let doc = new Question(req.body)
    doc.save().then( (data) => {
      User.findByIdAndUpdate(data.poster,
      {$push: {"listQuestion": data._id}},
      function(err, user) {
        if(err) console.log(err);
        else console.log(user);
      })
      res.send(data)
    }).catch( (err) =>{
      res.send(err)
    })
  },

  readOne: (req, res, next) => {
    Question.findOne({_id: req.params.id}).populate([{
      path: 'poster',
      model: 'User'
    }, {
      path: 'listAnswer',
      model: 'Answer',
      populate: {
        path: 'listComment',
        model: 'Comment'
      }
    }]).exec((err, docs) => {
        if(err) res.send(err)
        res.json(docs)
    })
  },

  upvote: (req, res, next) => {
    Question.findById(req.params.id, (err, doc) => {
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
    Question.findById(req.params.id, (err, doc) => {
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
    Question.find({}).populate({
      path: 'poster',
      model: 'User'
    }).exec((err, docs) => {
        if(err) res.send(err)
        else res.json(docs)
    })
  },

  update: (req, res, next) => {
    Question.findById(req.params.id, (err, doc) => {
      if (err) res.send(err)
      else {
        doc.update(req.body, (error, data) => {
          if(error) res.send(error)
          else res.send(data)
        })
      }
    })
  },

  deleteQuestion: (req, res, next) => {
    Question.remove({_id : req.params.id}, (err, doc) => {
      if (err) res.send(err)
      else res.send(doc)
    })
  }

}
