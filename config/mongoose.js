const mongoose= require('mongoose');

mongoose.connect('mongodb://localhost/sign_db',{ useNewUrlParser: true } );

const db=mongoose.connection;

db.on('error',console.error.bind(console, 'error connecting to the db'));

db.once('open', function(){
    console.log('successfully connected to the database');
});

module.exports=db;