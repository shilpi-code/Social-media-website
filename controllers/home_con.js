const Post = require('../models/post');
const User= require('../models/user');
module.exports.home= function(req,res){
     
     /*console.log(req.cookies);
     res.cookie('user_id',25);
     return res.render('home',{
          title: "Home"
     });*/

    /* Post.find({}, function(err, posts) {
          if (err) {
              console.log('error in fetching contacts');
              return;
          }
          return res.render('home', {
               title:'Codeial Home',
               post_show: posts
          });
      });*/

 // populate the user of each post
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts){

        User.find({}, function(err, users){
            return res.render('home', {
                title: "Codeial | Home",
                post_show:  posts,
                all_users: users
            });
        });

       
    })

}


   

  




