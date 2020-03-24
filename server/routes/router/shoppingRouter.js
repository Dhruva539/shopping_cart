'use strict';
const express = require('express');
const router = express.Router();
const shoppingController= require('../controllers/shoppingController');
const validateToken = require('../auth/validateToken');
validateToken(router);
shoppingController(router);
module.exports =router;