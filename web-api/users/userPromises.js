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
getSpecificUserIDQuery = async (userID) => {
    const query = 'SELECT * FROM user WHERE id=?';
    return new Promise((resolve, reject) => {
        conDB.query(query, [userID], (error, results, fields) => {
            if (error) {
                reject(error);
            }
            else if(results.length<1){
                results = 'User with such ID does not exist'
                resolve(results);

            }
            else {
                console.log(results)
                resolve(results);
            }
        });
    });
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
};

updateUserToSQL = (id, name, surname, email, age, isActive) => {
    const query = "UPDATE user SET name=?,surname=?,email=?,age=?,isActive=? WHERE id = ?;";
    return new Promise((resolve, reject) => {
        conDB.query(query, [name, surname, email, age, isActive, id], (error, results, fields) => {
            if (error) {
                reject(error);
            }
            else if(results.affectedRows<1){
               results = 'User with such ID does not exist'
               resolve(results)
            }
            else {
                resolve(results);
            }
        });
    });
};
getPostsFromUserWithID_SQL = (userID) => {
    const query = "SELECT user.id , user.name ,user.surname,posts.UserId,posts.text,posts.likes FROM posts INNER JOIN user ON user.id=posts.UserId WHERE user.id = ?;"
    return new Promise((resolve, reject) => {
        conDB.query(query,[userID], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

deleteUerSQL = (id)=>{
    const query = "DELETE FROM user WHERE id=?;"
    return new Promise((resolve,reject)=>{
        conDB.query(query,[id],(error, results, fields) => {
        if (error) {
            reject(error);
        }
        else {
            resolve(results);
        }
    });

    });
};
module.exports={
    getAllUsersQuery,
    getSpecificUserNameQuery,
    getSpecificUserIDQuery,
    writeNewUserToSQL,
    updateUserToSQL,
    getPostsFromUserWithID_SQL,
    deleteUerSQL
}