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

  read: (req, res, next) => {
    Question.find({}).populate('poster').exec((err, docs) => {
        if(err) res.send(err)
        res.json(docs)
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
