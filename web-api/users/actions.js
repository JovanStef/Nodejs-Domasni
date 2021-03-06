const helpers = require('../helpers');
const userPromises = require('./userPromises');
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');


getAllUsers = async (req, res) => {
    try {
        const users = await userPromises.getAllUsersQuery();
        res.status(200).send(users);
    }
    catch (error) {
        res.status(500).send(error.message);

    }
};

getUserByName = async (req, res, next) => {
    const userName = helpers.titleCase(req.params.name)
    if (userName.length == 0) {
        var error = new Error('no such username!');
        error.status = 404;
        return next(error);
    }
    try {
        const user = await userPromises.getSpecificUserNameQuery(userName);
        res.status(200).send(user[0]);
    }
    catch{
        res.status(500).send(error.message);
    }
};


getUserByID = async (req, res, next) => {
    const userID = req.params.id;
    // const users = await userPromises.getAllUsersQuery()
    // var userExists = users.some(user => { return parseInt(req.params.id) === user.id });
    // if (userID <= 0 || !userExists) {
    //     var error = new Error(`User with ${userID} does not exist`);
    //     error.status = 401;
    //     return next(error);
    // }
    try {
        const user = await userPromises.getSpecificUserIDQuery(userID);
        res.status(200).send(user);
    }
    catch (error) {
        res.status(500).send(error.message);
    }

};

loginUser = async (req, res, next) => {
    const bodyEmail = req.body.email;
    const bodyPassword = req.body.password;
    try {
        const user = await userPromises.getSpecificUserByEmailQuery(bodyEmail);
        var match = bcrypt.compareSync(bodyPassword, user[0].password);
        var currentUser = user[0];
        if (match) {
            var privateKey = 'trt'
            var token = jwt.sign({ currentUser}, privateKey,{ expiresIn: '1h' });
            res.status(200).send(token);
        } else {
            res.status(401).send('YOU SHALL NOT PASS !!!!');
        }
        console.log(match);
    } catch (error) {
        res.status(500).send(error);
    }
}

createNewUser = async (req, res, next) => {
    const users = await userPromises.getAllUsersQuery()
    var userExists = users.some(user => { return req.body.email === user.email });
    if (userExists) {
        var error = new Error('User with eamil exists!');
        error.status = 401;
        return next(error);
    } else if (!helpers.emailValidator(req.body.email)) {
        var error = new Error('Email not valid!');
        error.status = 401;
        return next(error);
    }
    else if (!helpers.ageValidator(req.body.age)) {
        var error = new Error('Age must be over 18!');
        error.status = 401;
        return next(error);
    }
    try {
        var hash = bcrypt.hashSync(req.body.password, 8)
        await userPromises.writeNewUserToSQL(req.body.name, req.body.surname, req.body.email, req.body.age, req.body.isActive, hash);
        res.status(200).send(req.body);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

updateUser = async (req, res, next) => {
    // var users = await userPromises.getAllUsersQuery()
    // var userExists = users.some(user => { return user.id == parseInt(req.params.id) });
    // if (!userExists) {
    //     var error = new Error(`User with ID ${req.params.id} does not exist`);
    //     error.status = 401;
    //     return next(error);
    // } 
    try {

        var aaa = await userPromises.updateUserToSQL(req.params.id, req.body.name, req.body.surname, req.body.email, req.body.age, req.body.isActive);
        res.status(202).send(aaa);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

editUser = async (req, res, next) => {
    var users = await userPromises.getAllUsersQuery();
    var userExists = users.some(user => { return user.id == parseInt(req.params.id) });
    if (!userExists) {
        var error = new Error(`User with ID ${req.params.id} does not exist`);
        error.status = 401;
        return next(error);
    }
    if (req.body.name == null || req.body.surname == null || req.body.age == null) {
        var error = new Error('Params: name,surname,age are mandatory!');
        error.status = 401;
        return next(error);
    }
    let userToUpdate = users.filter((user) => {
        if (user.id === parseInt(req.params.id)) {
            user.name = req.body.name
            user.surname = req.body.surname
            user.age = req.body.age
            if (req.body.email == null) {
                user.email = user.email
            } else {
                user.email = req.body.email
            } if (req.body.isActive == null) {
                user.isActive = user.isActive
            } else {
                user.isActive = req.body.isActive
            }
            if (req.body.password == null) {
                user.password = user.password
            } else {
                var hash = bcrypt.hashSync(req.body.password, 8)
                user.password = hash
            }
            return user
        }
    });
    try {
        var patchUser = userToUpdate[0];
        await userPromises.updateUserToSQL(req.params.id, patchUser.name, patchUser.surname, patchUser.email, patchUser.age, patchUser.isActive, patchUser.password);
        res.status(202).send('User patched');
    } catch (error) {
        res.status(500).send(error.message);

    }
};



deleteUser = async (req, res, next) => {
    let users = await userPromises.getAllUsersQuery()
    var userExists = users.some(user => { return user.id == parseInt(req.params.id) });
    if (!userExists) {
        var error = new Error(`User with ID ${req.params.id} does not exist`);
        error.status = 401;
        return next(error);
    } try {
        await userPromises.deleteUerSQL(req.params.id)
        res.send('Delete user with id = ' + req.params.id)
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    getAllUsers,
    getUserByName,
    getUserByID,
    loginUser,
    createNewUser,
    updateUser,
    editUser,
    deleteUser,
}