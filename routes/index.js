const express= require('express');

const router= express.Router();
const homecontroller= require('../controllers/home_con');

console.log('router loaded');
router.get('/',homecontroller.home);

router.use('/users',require('./users'));      // will land us to users.js file in routes only
router.use('/post',require('./posts'));
router.use('/comment',require('./comment'));


module.exports=router;