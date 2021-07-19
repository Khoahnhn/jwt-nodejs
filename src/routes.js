'use strict';

const express = require('express');
const router = express();

const auth = require('./controllers/auth/router');
router.use('/auth', auth);

module.exports = router;