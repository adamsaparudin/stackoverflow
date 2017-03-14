let Answer = require('../models/answer')

module.exports = {

  create: (req, res, next) => {
    let doc = new Answer(req.body)
    doc.save().then( (data) => {
      res.send(data)
    }).catch( (err) =>{
      res.send(err)
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
