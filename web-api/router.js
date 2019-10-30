var express = require('express');


var usersRout = require('./users/routes');
var postsRout = require('./posts/routes');

var appRouter = express.Router();

appRouter.use(usersRout);
appRouter.use(postsRout);

module.exports = appRouter
