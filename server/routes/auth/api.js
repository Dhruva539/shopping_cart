'use strict';
const express= require('express');
const router= express.Router();
const auth= require('./auth');
const validateToken= require('./validateToken');
auth(router);

module.exports= router;