// function Posts(userAndPosts){
//     this.userAndPosts = userAndPosts;
//     this.posts = this.userAndPosts.map(post=>{
//         var temp={ text : post.text,
//             likes : post.likes
//         }
//         return temp
//     });
// this.getPosts=()=>{
//     return this.posts
// }
// };

// function User(userAndPosts){
//     var posts = new Posts(userAndPosts);
//     this.userAndPosts = userAndPosts[0];
//     this.user = {
//         name:this.userAndPosts.name,
//         surname:this.userAndPosts.surname,
//         posts:posts.getPosts()
//     }
//     this.getUser=()=>{
//         console.log(this.user)
//         return this.user
//     }
// };


class User{
    constructor(userAndPosts){
        this.userProp = userAndPosts[0];
        this.postsProp = userAndPosts
    }
    toJson(){
        this.posts = this.postsProp.map(post=>{
            var temp={ text : post.text,
                likes : post.likes
            }
            return temp
        });
        var user ={
            name:this.userProp.name,
            surname:this.userProp.surname,
            posts:this.posts
        }
        return user
    };
};

module.exports={
    // Posts,
    User
}