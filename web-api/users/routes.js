var express = require('express');


const actions = require('./actions');

var routes = express.Router();

routes.get('/',actions.getAllUsers);

routes.get('/name/:name',actions.getUserByName);
routes.get('/id/:id',actions.getUserByID);
routes.post('/',actions.createNewUser);
routes.put('/:id', actions.updateUser);
routes.patch('/:id',actions.editUser);
routes.get('/:id/posts',actions.getPostsFromUserWithID);
routes.delete('/:id', actions.deleteUser);

module.exports = routes