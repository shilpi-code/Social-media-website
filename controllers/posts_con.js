const Post= require('../models/post');
const Comment= require('../models/comments');

module.exports.post= function(req,res){
    Post.create({                         //for populating a database
        content:req.body.content,
        user:req.user._id
    },function(err,post){
        if(err){
            console.log('error in creating a post');
            return;
        }
        return res.redirect('back');
    });
}

module.exports.destroy = function(req, res){
    Post.findById(req.params.id, function(err, post){
        // below line checks if the user who posted is same as the user who signed in
        // .id means converting the object id into string otherwise would be written as req.user._id
        if (post.user == req.user.id){   //post.user gives the id unless we populate it as in models user is storing an id
            post.remove();

            Comment.deleteMany({post: req.params.id}, function(err){
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }

    });
}