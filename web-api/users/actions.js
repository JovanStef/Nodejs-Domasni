const fs = require('fs');
const path = require('path');
const helpers = require('../helpers');
const conDB = require('../database');

getAllUsersQuery = () => {
    const query = 'SELECT *FROM user';
    return new Promise((resolve, reject) => {
        conDB.query(query, (error, results, fields) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        });
    });
};

getAllUsers = async (req, res) => {
    try {
        const users = await getAllUsersQuery();
        res.status(200).send(users);
    }
    catch (error) {
        res.status(500).send(error.message);

    }
};

getSpecificUserNameQuery = async (userName) => {
    const query = 'SELECT * FROM user WHERE name=?';
    return new Promise((resolve, reject) => {
        conDB.query(query, [userName], (error, results, fields) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        });
    });
};

getUserByName = async (req, res, next) => {
    const userName = helpers.titleCase(req.params.name)
    if (userName.length == 0) {
        var error = new Error('no such username!');
        error.status = 404;
        next(error);
    }
    try {
        const user = await getSpecificUserNameQuery(userName);
        res.status(200).send(user[0]);
    }
    catch{
        res.status(500).send(error.message);
    }
};
getSpecificUserIDQuery = async (userID) => {
    const query = 'SELECT * FROM user WHERE id=?';
    return new Promise((resolve, reject) => {
        conDB.query(query, [userID], (error, results, fields) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        });
    });
};

getUserByID = async (req, res, next) => {
    const userID = req.params.id;
    if (userID <= 0) {
        var error = new Error('Id can not be less than 1!');
        error.status = 401;
        return next(error);
    }
    try {
        const user = await getSpecificUserIDQuery(userID);
        res.status(200).send(user[0]);
    }
    catch (error) {
        res.status(500).send(error.message);
    }

};

writeNewUserToSQL = (name, surname, email, age, isActive) => {
    const query = "INSERT INTO user (name, surname, email,age,IsActive) VALUES ('" + name + "','" + surname + "','" + email + "'," + age + "," + isActive + ");";
    return new Promise((resolve, reject) => {
        conDB.query(query, (error, results, fields) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        });
    });
}

createNewUser = async (req, res, next) => {
    const users = await getAllUsersQuery()
    var userExists = users.some(user => { return req.body.email === user.email });
    if (userExists) {
        var error = new Error('User with eamil exists!');
        error.status = 401;
        next(error);
    } else if (!helpers.emailValidator(req.body.email)) {
        var error = new Error('Email not valid!');
        error.status = 401;
        next(error);
    }
    else if (!helpers.ageValidator(req.body.age)) {
        var error = new Error('Age must be over 18!');
        error.status = 401;
        next(error);
    }
    await writeNewUserToSQL(req.body.name, req.body.surname, req.body.email, req.body.age, req.body.isActive);
    res.status(200).send(req.body);
};

updateUserToSQL = (id, name, surname, email, age, isActive) => {
    const query = "UPDATE user SET name=?,surname=?,email=?,age=?,isActive=? WHERE id = ?;";
    return new Promise((resolve, reject) => {
        conDB.query(query, [name, surname, email, age, isActive, id], (error, results, fields) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        });
    });
}
updateUser = async (req, res, next) => {
    var users = await getAllUsersQuery()
    var userExists = users.some(user => { return user.id == parseInt(req.params.id) });
    if (!userExists) {
        var error = new Error(`User with ID ${req.params.id} does not exist`);
        error.status = 401;
        return next(error);
    }
    await updateUserToSQL(req.params.id, req.body.name, req.body.surname, req.body.email, req.body.age, req.body.isActive);
    res.status(202).send('User updated');
};

editUser = async(req, res,next) => {
    var users = await getAllUsersQuery();
    var userExists = users.some(user => { return user.id == parseInt(req.params.id) });
    if (!userExists) {
        var error = new Error(`User with ID ${req.params.id} does not exist`);
        error.status = 401;
        return next(error);
    }
    if(req.body.name==null||req.body.surname==null||req.body.age==null){
        var error = new Error('Params: name,surname,age are mandatory!');
        error.status = 401;
        return next(error);
    }
    let userToUpdate = users.filter((user) => {
        if (user.id === parseInt(req.params.id)) {
            user.name = req.body.name
            user.surname = req.body.surname
            user.age = req.body.age
            if(req.body.email==null){
                user.email = user.email
            }else{
                user.email = req.body.email
            }if(req.body.isActive==null){
                user.isActive = user.isActive
            }else{
                user.isActive = req.body.isActive
            }
            return user
        }
    });
    var patchUser = userToUpdate[0];
    await updateUserToSQL(req.params.id, patchUser.name, patchUser.surname, patchUser.email, patchUser.age, patchUser.isActive);
    res.status(202).send('User patched');
};

deleteUser = (req, res) => {
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
    deleteUser,
}