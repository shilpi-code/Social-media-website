const User= require('../models/user');
const db = require('../config/mongoose')
// const pass= require('../config/passport-local-strategy')


/*module.exports.profile= function(req,res){
      if(req.cookies.user_id){       //if user id is present in the cookies
          User.findById(req.cookies.user_id,function(err,user){    //finding that user id in the db
               if(user) {                //if user is found
                    return res.render('users',{
                         title:'User profile',
                         user:user
                    });
               
               }else{
                    return res.redirect('users/sign-in');
               }     
          })
     }else{
          return res.redirect('/users/sign-in');
     }
}*/

module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('users', {
            profile_user: user
        });
    });

}

module.exports.update = function(req, res){
     if(req.user.id == req.params.id){
         User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
             return res.redirect('back');
         });
     }else{
         return res.status(401).send('Unauthorized');
     }
 }
 


//to render sign-in page
module.exports.signin= function(req,res){    
    return res.render('user_signin');
}

//to render sign-up page
module.exports.signup= function(req,res){   
         return res.render('user_signup.ejs');
}

module.exports.create=function(req,res){
     if(req.body.password!= req.body.confirm_password){
          return res.redirect('back');
     }
     User.findOne({email:req.body.email},function(err,user){
          if(err){
               console.log('error in finding user in signing up');
               return;
          }
          if(!user){  //if the user is not registered earlier,create it
               User.create(req.body,function(err,user){
                    if(err){
                         console.log('error in creating user in signing up');
                         return;  
                    }
                    return res.redirect('/users/sign-in');
               });
          }
          else{
               return res.redirect('back');
          }
     });
}


/* //sign in and create a session for the user
module.exports.createsession=function(req,res){

     //steps to authenticate
     //find the user
     User.findOne({email:req.body.email},function(err,user){
          if(err){
               console.log('error in finding user in signing in');return;
          }
          //handle user found

          if(user){

               //handle password which doesn't match
               if(user.password!= req.body.password){
                    return res.redirect('back');
               }

               //handle session creation
                res.cookie('user_id',user.id);  //encrypting the user id in the cookies so that we can send it to the server
                return res.redirect('/users/profile');

          }else{
               //handle user not found
               return res.redirect('back');
          }
     })
}*/

// sign in and create a session for the user
module.exports.createSession = function(req, res){
     return res.redirect('/users/profile/:id');
 }

module.exports.delete= function(req,res){
     res.clearCookie('user_id');
     return res.redirect('/users/sign-in');
}

// for sign-out or destroying the session
module.exports.destroySession = function(req, res){
     req.logout();     //in-built,provided by passport to req 
 
     return res.redirect('/');
 }
