var express = require('express');
const fs = require('fs');
const path = require('path');

const actions = require('./actions');

var routes = express.Router();

routes.get('/',actions.getAllUsers);

routes.get('/name/:name',actions.getUserByName);
routes.get('/id/:id',actions.getUserByID);
routes.post('/',actions.createNewUser);
routes.put('/:id', actions.updateUser);
routes.patch('/:id',actions.editUser);
routes.delete('/:id', actions.deleteUser);

module.exports = routes