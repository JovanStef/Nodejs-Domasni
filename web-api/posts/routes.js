var express = require('express');
const actions= require('./actions');

const routes = express.Router();

routes.get('/users/posts',actions.getAllPosts);
routes.get('/users/:userId/posts/:postId',actions.getPostByID);
routes.get('/users/:userId/posts',actions.getPostsFromUserWithID);
routes.post('/users/:userId/posts',actions.createNewPost);
routes.put('/users/:userId/posts',actions.updatePost);
routes.patch('/users/:userId/posts',actions.editPost);
routes.delete('/users/:userId/posts',actions.deletePost);


module.exports=routes