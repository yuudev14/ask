const express = require('express');
const authentication = require('./controllers/authentication_controller');

const route = express.Router();


route.post('/is-email-exist', authentication.check_email_exist);
route.post('/register', authentication.register);
route.post('/login', authentication.login);
route.post('/oAuth', authentication.oAuth);
route.post('/logout', authentication.logout);

module.exports = route;