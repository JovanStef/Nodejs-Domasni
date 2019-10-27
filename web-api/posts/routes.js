var express = require('express');
const actions= require('./actions');

const routes = express.Router();

routes.get('/',actions.getAllPosts);
routes.get('/:id',actions.getPostByID);

module.exports=routes