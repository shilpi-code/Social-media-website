const express=require('express');
const cookieParser=require('cookie-parser');
const app= express();
const port=8000;
const expressLayouts= require('express-ejs-layouts');
const db=require('./config/mongoose');


// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo')(session); //it requires an argument session
const sassMiddleware= require('node-sass-middleware'); //write before the server starts

app.use(sassMiddleware({
    src: './assets/scss',     //for scss file location
    dest: './assets/css',
    debug: true,
    outputStyle:'extended',    //means output in single line or multiple lines
    prefix: '/css'

}));
app.use(express.urlencoded());

app.use(cookieParser());
app.use(express.static('./assets'));


// extract style and scripts from subpages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.use(expressLayouts);


// set up the view engine
app.set('view engine', 'ejs');
app.set('views','./views');

//mongo store is used to the session cookie in the db, session persists after restarting the server
app.use(session({        //always after the views
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
    {
        mongooseConnection:db,
        autoRemove: 'disabled'
    },
    function(err){
        console.log(err || 'connected mongodb setup ok')
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

 app.use(passport.setAuthenticatedUser);

//use express router
app.use('/', require('./routes'));




app.listen(port,function(err){
    if(err){
        console.log(`Error: ${err}`);
    }
    console.log(`Server is running on the port: ${port}`)
});