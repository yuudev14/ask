const express = require('express');
const route = express.Router();
const verify_token = require('../middlewares/verify_token');
const answer = require('./controllers/answer_controller');



route.post('/vote-up/:id', verify_token, answer.vote_up);
route.post('/vote-down/:id', verify_token, answer.vote_down);
route.post('/add-comment/:id', verify_token, answer.add_comment);
route.delete('/delete-answer/:id', verify_token, answer.deleteAnswer);
route.delete('/delete-comment/:id', verify_token, answer.deleteComments);
route.get('/view-comments/:id', answer.view_comments);

module.exports = route;