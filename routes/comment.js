const express=require('express');
const passport= require('passport');
const router= express.Router();


const commentcontroller= require('../controllers/comment_con');
router.post('/create',passport.checkAuthentication,commentcontroller.comment);
router.get('/destroy/:id',passport.checkAuthentication,commentcontroller.destroy);

module.exports=router;