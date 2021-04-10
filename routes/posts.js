const express=require('express');
const passport= require('passport');
const router= express.Router();


const postcontroller= require('../controllers/posts_con');
router.post('/create',passport.checkAuthentication,postcontroller.post);//post will only be made by a user who is signed in
router.get('/destroy/:id',passport.checkAuthentication,postcontroller.destroy);

module.exports=router;
