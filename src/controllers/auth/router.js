'use strict';

const express = require('express');

const route = express();
const api = require('./api');
const {auth} = require('../base/passport');

route.post('/login', api.login);
route.get('/test', auth, api.dashboard);

module.exports = route;
