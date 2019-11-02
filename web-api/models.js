function Posts(userAndPosts){
    this.userAndPosts = userAndPosts;
    this.posts = this.userAndPosts.map(post=>{
        var temp={ text : post.text,
            likes : post.likes
        }
        return temp
    });
this.getPosts=()=>{
    return this.posts
}
};

function User(userAndPosts){
    var posts = new Posts(userAndPosts);
    this.userAndPosts = userAndPosts[0];
    this.user = {
        name:this.userAndPosts.name,
        surname:this.userAndPosts.surname,
        posts:posts.getPosts()
    }
    this.getUser=()=>{
        console.log(this.user)
        return this.user
    }
};

module.exports={
    Posts,
    User
}