//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const session = require('express-session')


//___________________
//Config
//___________________

require('dotenv').config();
const app = express()
const db = mongoose.connection
const PORT = 3000
const mongodbURI = process.env.MONGODBURI

//___________________
//Middleware
//___________________
//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form
//use public folder for static assets
app.use(express.static('public'));
// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: true }));// extended: false - does not allow nested objects in query strings
app.use(
  session({
    secret: process.env.SECRET, //a random string do not copy this value or your stuff will get hacked
    resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
    saveUninitialized: false // default  more info: https://www.npmjs.com/package/express-session#resave
  })
)
//___________________
//Database
//___________________
// Connect to Mongo
mongoose.connect(mongodbURI ,  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', mongodbURI));
db.on('disconnected', () => console.log('mongo disconnected'));
// open the connection to mongo
db.on('open' , ()=>{});



//___________________
// Controllers
//___________________

const userController = require('./controllers/user_controllers.js')
app.use('/users', userController)

const sessionsController = require('./controllers/session_controller.js')
app.use('/sessions', sessionsController)

const laxController = require('./controllers/lax_controller.js')
app.use('/lax', laxController)
//___________________
// Routes
//___________________
//localhost:3000
app.get('/' , (req, res) => {

  res.redirect("/lax");
});
//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));