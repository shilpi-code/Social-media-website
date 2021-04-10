const Comment= require('../models/comments');
const Post= require('../models/post');

module.exports.comment= function(req,res){
    Post.findById(req.body.post, function(err, post){  //req.body.post here post is coming from home.ejs from input name attribute

        if (post){ 
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment){
                if(err){
                    console.log('error in adding a comment');
                    return;
                }

                post.comments.push(comment);
                post.save();
                return res.redirect('/');
            });
        }

    });


}

module.exports.destroy = function(req, res){
    Comment.findById(req.params.id, function(err, comment){
        if (comment.user == req.user.id){

            let postId = comment.post;

            comment.remove();

            Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}}, function(err, post){
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    });
}