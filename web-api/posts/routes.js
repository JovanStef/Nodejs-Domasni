var express = require('express');
const actions= require('./actions');

const routes = express.Router();

routes.get('/',actions.getAllPosts);
routes.get('/:id',actions.getPostByID);

routes.post('/',actions.createNewPost);
routes.put('/:id',actions.updatePost);
routes.patch('/:id',actions.editPost);
routes.delete('/:id',actions.deletePost);


module.exports=routes