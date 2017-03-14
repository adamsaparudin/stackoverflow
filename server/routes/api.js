var express = require('express');
var router = express.Router();

// Models list
// QUESTION: It's necessary to add Category and link ?
let User = require('../controllers/user')
let Question = require('../controllers/question')
let Answer = require('../controllers/answer')
let Comment = require('../controllers/comment')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// Routing only for api

/* Users */
router.get('/users', User.read)
router.post('/users', User.create)
router.put('/users/:id', User.update)
router.delete('/users/:id', User.deleteUser)

// TODO: after create questions, update field user with list post question
/* Question */
router.get('/questions', Question.read)
router.post('/questions', Question.create)
router.put('/questions/:id', Question.update)
router.delete('/questions/:id', Question.deleteQuestion)

// TODO: after create answer, update field answer with list answer
/* Answer */
router.get('/answer', Answer.read)
router.post('/answer', Answer.create)
router.put('/answer/:id', Answer.update)
router.delete('/answer/:id', Answer.deleteAnswer)

module.exports = router;
