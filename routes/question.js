const express = require('express');
const route = express.Router();
const question = require('./controllers/question_controller');
const verify_token = require('../middlewares/verify_token');
const verify_question_form = require('../middlewares/verify_question_forms');


route.post('/submit-question', verify_token, verify_question_form, question.submitQuestion);
route.post('/answer-question', verify_token, question.answerQuestion);
route.post('/vote-up/:id', verify_token, question.vote_up);
route.post('/vote-down/:id', verify_token, question.vote_down);
route.delete('/delete/:id', question.deleteQuestion)

module.exports = route;