const conDB = require('../database');

getAllPostsQuery = () => {
    const query = 'SELECT * FROM posts';
    return new Promise((resolve, reject) => {
        conDB.query(query, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
        });
    });
};

getPostByIDQuery = (id) => {
    const query = 'SELECT*FROM posts WHERE id=?';
    return new Promise((resolve, reject) => {
        conDB.query(query, [id], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

writeNewPostToSQL = (text, likes,UserId) => {
    const query = "INSERT INTO posts (text, likes,createdOn,UserId)VALUES (?,?,NOW(),?);"
    return new Promise((resolve, reject) => {
        conDB.query(query,[text,likes,UserId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};



updatePostToSQL = (id, text, likes) => {
    const query = "UPDATE posts SET text=? , likes=?,createdOn=NOW() WHERE id=?;"
    return new Promise((reslove, reject) => {
        conDB.query(query, [text, likes, id], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                reslove(results);
            }
        });
    });
};
deletePostFromSQL = (id)=>{
    const query = "DELETE FROM posts WHERE id=?;"
    return new Promise((reslove,reject)=>{
        conDB.query(query,[id],(error,results,fields)=>{
            if(error){
                reject(error);
            }else{
                reslove(results)
            };
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
module.exports = {
    getAllPostsQuery,
    getPostByIDQuery,
    writeNewPostToSQL,
    updatePostToSQL,
    deletePostFromSQL,
    getPostsFromUserWithID_SQL
}