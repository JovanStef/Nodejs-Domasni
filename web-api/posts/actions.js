const helpers = require('../helpers');
const postsPromises = require('./postsPromises');
const {User} = require('../models');

getAllPosts = async (req, res) => {
    try {
        const posts = await postsPromises.getAllPostsQuery();
        res.status(200).send(posts);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

getPostByID = async (req, res, next) => {
    const postID = req.params.postId;
    try {
        const post = await postsPromises.getPostByIDQuery(postID);
        res.status(500).send(post);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

createNewPost = async (req, res, next) => {
    console.log(req.body.UserId)
    try {
        await postsPromises.writeNewPostToSQL(req.body.text, req.body.likes, req.body.UserId);
        res.status(200).send(req.body);
    } catch (error) {
        res.status(500).send(error.message);
    }
};



updatePost = async (req, res, next) => {
    const postID = parseInt(req.params.id);
    const allPosts = await postsPromises.getAllPostsQuery();
    let postExists = allPosts.some(post => { return post.id === postID });
    console.log(postExists)
    if (!postExists) {
        var error = new Error(`Post with ID ${postID} does not exist!`)
        error.status = 401;
        return next(error);
    }
    try {
        await postsPromises.updatePostToSQL(postID, req.body.text, req.body.likes);
        res.status(200).send('User updated');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

editPost = async (req, res, next) => {
    let postID = parseInt(req.params.id);
    const allPosts = await postsPromises.getAllPostsQuery();
    let postExists = allPosts.some(post => { return post.id === postID });
    if (!postExists) {
        var error = new Error(`Post with ID ${postID} does not exist!`);
        error.status = 401;
        return next(error);
    }
    else if (req.body.text == null) {
        var error = new Error('Text field is mandatory!');
        error.status = 401;
        return next(error);
    }
    let postToUpdate = allPosts.filter((post) => {
        if (post.id === parseInt(req.params.id)) {
            post.text = req.body.text
        };
        if (req.body.likes == null) {
            post.likes = post.likes
        } else {
            post.likes = req.body.likes
        };
        return post
    });
    try {
        let patchPost = postToUpdate[0];
        await postsPromises.updatePostToSQL(req.params.id, patchPost.text, patchPost.likes);
        res.status(200).send(patchPost)
    } catch (error) {
        res.status(500).send(error.message);

    }
};

deletePost = async (req, res, next) => {
    let postID = parseInt(req.params.id);
    const allPosts = await postsPromises.getAllPostsQuery();
    let postExists = allPosts.some(post => { return post.id == postID });
    if (!postExists) {
        var error = new Error(`Post with ID ${postID} does not exist!`);
        error.status = 401;
        return next(error)
    }
    try {
        await postsPromises.deletePostFromSQL(postID);
        res.status(200).send(`Post with ID ${postID} deleted!`);
    } catch (error) {
        res.status(500).send(error.message)
    }
};
getPostsFromUserWithID = async (req, res, next) => {
    try {
        userAndPosts = await postsPromises.getPostsFromUserWithID_SQL(req.params.userId);
    
        // var posts = userAndPosts.map(post=>{
        //     var temp={ text : post.text,
        //         likes : post.likes
        //     }
        //     return temp
        // });
        // var user = {
        //     name:userAndPosts[0].name,
        //     surname:userAndPosts[0].surname,
        //     post:posts
        // }
        
        var user = new User(userAndPosts)
        res.status(200).send(user.toJson());
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    getAllPosts,
    getPostByID,
    createNewPost,
    updatePost,
    editPost,
    deletePost,
    getPostsFromUserWithID
}