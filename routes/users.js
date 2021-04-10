const express=require('express');
const db = require('../config/mongoose');
const passport = require('passport');

const router=express.Router();

const usercontroller= require('../controllers/users_con');

router.get('/profile/:id',passport.checkAuthentication,usercontroller.profile);
router.post('/update/:id',passport.checkAuthentication,usercontroller.update);
router.get('/sign-in',usercontroller.signin);
router.get('/sign-up',usercontroller.signup);
router.post('/create',usercontroller.create);
// router.post('/create-session',usercontroller.createsession);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usercontroller.createSession);


router.get('/delete',usercontroller.delete);
router.get('/sign-out',usercontroller.destroySession);


module.exports=router;