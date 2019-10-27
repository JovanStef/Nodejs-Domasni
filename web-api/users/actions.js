const helpers = require('../helpers');
const userPromises = require('./userPromises');

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
    const users = await userPromises.getAllUsersQuery()
    var userExists = users.some(user => { return req.params.id === user.id });
    if (userID <= 0 || !userExists) {
        var error = new Error(`Post with ${postID} does not exist`);
        error.status = 401;
        return next(error);
    }
    try {
        const user = await userPromises.getSpecificUserIDQuery(userID);
        res.status(200).send(user[0]);
    }
    catch (error) {
        res.status(500).send(error.message);
    }

};


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
    } try {

        await userPromises.writeNewUserToSQL(req.body.name, req.body.surname, req.body.email, req.body.age, req.body.isActive);
        res.status(200).send(req.body);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

updateUser = async (req, res, next) => {
    var users = await userPromises.getAllUsersQuery()
    var userExists = users.some(user => { return user.id == parseInt(req.params.id) });
    if (!userExists) {
        var error = new Error(`User with ID ${req.params.id} does not exist`);
        error.status = 401;
        return next(error);
    } try {

        await userPromises.updateUserToSQL(req.params.id, req.body.name, req.body.surname, req.body.email, req.body.age, req.body.isActive);
        res.status(202).send('User updated');
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
            return user
        }
    });
    try {
        var patchUser = userToUpdate[0];
        await userPromises.updateUserToSQL(req.params.id, patchUser.name, patchUser.surname, patchUser.email, patchUser.age, patchUser.isActive);
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
    createNewUser,
    updateUser,
    editUser,
    deleteUser,
}