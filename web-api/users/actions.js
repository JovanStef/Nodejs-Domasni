const fs = require('fs');
const path = require('path');
const helpers = require('../helpers');

getAllUsers = (req, res) => {
    var users = helpers.readFromJson();
    res.status(200).send(users);
};

getUserByName = (req, res, next) => {
    var users = helpers.readFromJson();
    let paramToSentCase = helpers.titleCase(req.params.name)

    var currentUser = users.filter(user => {
        var someuser = user.name === paramToSentCase
        return someuser
    });
    if (currentUser.length == 0) {
        var error = new Error('no such username!');
        error.status = 404;
        next(error);

    }
    else {
        res.status(200).send(currentUser);
        return currentUser

    }

};

getUserByID = (req, res) => {
    var users = helpers.readFromJson();
    let currentUser = users.filter(x => {
        let selectedUser = x.id == req.params.id
        return selectedUser
    })

    res.status(200).send(currentUser[0])
};

createNewUser = (req, res, next) => {
    var users = helpers.readFromJson();
    
    var userExists = users.some(user => { return req.body.id === user.id });
    if (userExists) {
        var error = new Error('User with ID exists!');
        error.status = 401;
        next(error);
    }
    else {
        users.push(req.body);
    }
    
    helpers.writeToJson(users)
    res.status(201).send('User has been created!')
};

updateUser = (req, res) => {
    var users = helpers.readFromJson();
    users.forEach(user => {
        if (user.id === parseInt(req.params.id)) {
            user.name = req.body.name
            user.surname = req.body.surname
            user.email = req.body.email
            user.age = req.body.age
            user.isActive = req.body.isActive

            helpers.writeToJson(users)

            res.status(202).send('User udated');
        }
});
};

editUser = (req, res) => {
    var users = helpers.readFromJson();
    users.forEach((user) => {
      if (user.id === parseInt(req.params.id)) {
  
        user.name = req.body.name
        user.surname = req.body.surname
  
    helpers.writeToJson(users)
    
  
        res.send('patchUser')
      }
    });
  };

 deleteUser =(req, res) => {
    var allUsers = helpers.readFromJson();
      
    let users = allUsers.filter((user) => {
      return user.id !== parseInt(req.params.id)
    })
    helpers.writeToJson(users)
  
    
    res.send('Delete user with id = ' + req.params.id)
  };

module.exports = {
    getAllUsers,
    getUserByName,
    getUserByID,
    createNewUser,
    updateUser,
    editUser,
    deleteUser
}