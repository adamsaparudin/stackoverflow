let Comment = require('../models/comment')

module.exports = {

  create: (req, res, next) => {
    let doc = new Comment(req.body)
    doc.save().then( (data) => {
      res.send(data)
    }).catch( (err) =>{
      res.send(err)
    })
  },

  read: (req, res, next) => {
    Comment.find({}).exec((err, docs) => {
        if(err) res.send(err)
        res.json(docs)
    })
  },

  update: (req, res, next) => {
    Comment.findById(req.params.id, (err, doc) => {
      if (err) res.send(err)
      else {
        doc.update(req.body, (error, data) => {
          if(error) res.send(error)
          else res.send(data)
        })
      }
    })
  },

  deleteComment: (req, res, next) => {
    Comment.remove({_id : req.params.id}, (err, doc) => {
      if (err) res.send(err)
      else res.send(doc)
    })
  }

}
