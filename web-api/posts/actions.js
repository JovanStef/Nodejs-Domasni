const helpers = require('../helpers');
const postsPromises = require('./postsPromises');

getAllPosts = async(req,res)=>{
    try{
        const posts = await postsPromises.getAllPostsQuery();
        res.status(200).send(posts);
    }catch(error){
res.status(500).send(error.message);
    }
};

module.exports={
    getAllPosts
}