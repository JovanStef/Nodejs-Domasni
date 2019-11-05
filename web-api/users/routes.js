var express = require('express');


const actions = require('./actions');

var routes = express.Router();

routes.get('/users',actions.getAllUsers);
routes.get('/users/name/:name',actions.getUserByName);
routes.get('/users/id/:id',actions.getUserByID);
routes.post('/users',actions.createNewUser);
routes.put('/users/:id', actions.updateUser);
routes.patch('/users/:id',actions.editUser);
routes.delete('/:id', actions.deleteUser);

module.exports = routes