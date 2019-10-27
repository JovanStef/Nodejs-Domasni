const conDB = require('../database');

getAllPostsQuery = ()=>{
    const query = 'SELECT * FROM posts';
    return new Promise((resolve,reject)=>{
        conDB.query(query,(error,results,fields)=>{
            if(error){
                reject(error);
            }else{
                resolve(results)
            }
        });
    });
};

getPostByIDQuery = async(id)=>{
    const query= 'SELECT*FROM posts WHERE id=?';
    return new Promise((resolve , reject)=>{
        conDB.query(query,[id],(error,results,fields)=>{
            if(error){
                reject(error);
            }else{
                resolve(results);
            }
        });
    });
};

module.exports={
    getAllPostsQuery,
    getPostByIDQuery
}