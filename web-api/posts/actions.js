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

getPostByID = async(req,res,next)=>{
    const postID = req.params.id;
    if(postID<=0){
        var error = new Error(`Post with ${postID} does not exist`);
        error.status=401;
        return next(error);
    }try{
        const post = await postsPromises.getPostByIDQuery(postID);
        res.status(500).send(post);
    }catch(error){
res.status(500).send(error.message);
    }
};

module.exports={
    getAllPosts,
    getPostByID
}