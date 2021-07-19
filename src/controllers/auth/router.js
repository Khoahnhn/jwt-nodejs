'use strict';

const express = require('express');

const route = express();
const api = require('./api');

route.post('/login', api.login);

module.exports = route;
