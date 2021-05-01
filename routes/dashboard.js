const express = require('express');
const route = express.Router();
const verify_token = require('../middlewares/verify_token');
const dashboard = require('./controllers/dashboard_controller');

route.get('/verify-token', verify_token, dashboard.getUserInfo);
route.post('/search', dashboard.search);
route.get('/popular-questions/:start', dashboard.popularQuestions);
route.get('/new-questions/:start', dashboard.newQuestions);
route.get('/most-viewed-questions/:start', dashboard.mostViewedQuestions);
route.get('/Q/:question_title', dashboard.getQuestionDetails);
route.get('/Q-answers/:question_title', dashboard.getQuestionsAnswers);
route.post('/view/:question_title', dashboard.viewQuestion);
route.get('/profile-new/:username', dashboard.getOtherUsersNewQuestionLists);
route.get('/profile-info/:username', dashboard.getProfileInfo);
route.get('/profile-popular/:username', dashboard.getOtherUsersPopularQuestionLists);
route.get('/profile-most-viewed/:username', dashboard.getOtherUsersMostViewedQuestionLists);
route.get('/user-new', verify_token, dashboard.getUsersNewQuestionLists);
route.get('/user-popular', verify_token, dashboard.getUsersPopularQuestionLists);
route.get('/user-most-viewed', verify_token, dashboard.getUsersMostViewedQuestionLists);
route.post('/previously-viewed', dashboard.previouslyViewedQuestion);
route.get('/notifications', verify_token, dashboard.getNotifications);
route.post('/seen-notification', verify_token, dashboard.seenAllNotifications);
route.get('/popular-tags', dashboard.getPopularTags);

module.exports = route;