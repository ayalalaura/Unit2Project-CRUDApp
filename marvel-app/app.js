// Express
var express = require('express');
var app = express();

// Server on port 3000
var port = process.env.PORT || 3000;

// Load server
app.listen(port, function() {
  console.log('Node app is running on port', port);
});

// user login encryption
var bcrypt = require('bcryptjs'); // or just 'bcrypt', depending on what you installed

// Express Session
var session = require('express-session');

// setting a secret value for your sessions (cookies)
app.use(session({
  secret: 'marvelR0x31', // do I need to hide this?
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

// PG-Promise
var pgp = require('pg-promise')();
var db = pgp(process.env.DATABASE_URL || 'postgres://student_10@localhost:5432/marvel_crud');

// Mustache
var mustacheExpress = require('mustache-express');
app.engine('html', mustacheExpress());

// Views + Public Files
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use('/', express.static(__dirname + '/public'));

// Method Override
var methodOverride = require('method-override');
app.use(methodOverride('_method'));

// Body Parser
var bdPars = require('body-parser');
app.use(bdPars.urlencoded({ extended: false}));
app.use(bdPars.json());

// Request
var request = require('request');

// Keys/Hash
var PUBLIC_KEY = process.env.PUBLIC_KEY;
var PRIVATE_KEY = process.env.PRIVATE_KEY;
var HASH = process.env.HASH;



// API Route
// Using request npm module - similar to ajax syntax, calls the API. Nestled within app.get, which creates a route to view that data
// blessed by my lovely IA's - nested requests!!!

// route to get character data from api
app.get('/api', function(req, res){
  var character = req.query.value;
  var firstApi = 'https://gateway.marvel.com:443/v1/public/characters?name=' + character + '&ts=1&apikey=' + PUBLIC_KEY + '&hash=' + HASH;
  request.get({
    url: firstApi,
    json: true,
  }, function(err, resp, data){ // similar to .done or success function
    var characterData = data.data.results[0]; // getting back one character
    var characterId = data.data.results[0].id; // need this for second API call (IT WORKS)
    var secondApi = 'https://gateway.marvel.com:443/v1/public/characters/' + characterId + '/comics?limit=12&ts=1&apikey=' + PUBLIC_KEY + '&hash=' + HASH;
    // nested request for comics by character ID
    request.get({
      url: secondApi,
      json: true,
    }, function(err, resp, data){
      var comicData = data.data.results; // array of 12 comic objects
      res.json({
        characterData,
        comicData
      }); // ends inner success function, returning both sets of data
      console.log('server-side request worked!'); // this works!
    } // inner request.get
    ) // ends inner request.get
    } // main request.get
  ) // ends main request.get
}) // ends app.get


// Index route
app.get('/', function(req,res){
  console.log('Index loaded');
  res.render('index');
})

// comics stash (only accessible if you're logged in (button on the login page))
app.get('/stash', function(req, res){
  var user = req.session.user;
  var data = {data:user};
  if (user) {
    db.many('SELECT * FROM comics WHERE users_id = $1', [user.id]).then(function(something){
      data['comics'] = something;
      console.log(data);
      res.render('stash', data);
    })
  } else {
    res.redirect('/');
  }
})

// add selected comic book to comics db, triggered by ???
// app.post('/', function(req, res){
//   ????
//    db.none.....
// })


// Delete comic from stash
app.delete('/stash', function(req,res){
  var user = req.session.user;
  db.one('DELETE FROM comics WHERE users_id = $1', [user.id]);
    // no promise needed, so we skip straight to the render
    res.render('index'); // how can I redirect to the index page? res.redirect?
});


// USER ROUTES
// Login, remember session
app.get('/login', function(req, res){
  var logged_in;
  var email;
  if(req.session.user){ // the session is remembered
    logged_in = true;
    email = req.session.user.email
  }
  var data = {
    'logged_in': logged_in,
    'email': email
  }
  res.render('login', data); // the response we want
})

// Render signup page
app.get('/signup', function(req, res){
  res.render('signup');
})

// Save user info to db
app.post('/signup', function(req, res){
  // Save user to the database (need to create one: psql -d marvel_crud -f db/marvel_schema.sql). This creates an empty database which will store the users's email and hash password. We want to take the user's password, run it through an encryptor and save it in the database (getting nothing back)
  var data = req. body // use body parser to grab the input
  bcrypt.hash(data.password, 10, function(err, hash){  // (what's getting hashed, the number of times it's salted(we use 10 because that's what's in the bcrypt documentation), callback function with error and hash value)
     db.none('INSERT INTO users (email, password_digest) VALUES ($1, $2)', [data.email, hash] // we wrap it in bcrypt; data.password becomes hash
    ).then(function(){
      res.send('User created!');
      // res. redirect to index?
    });
  })
})

// Check db for user
app.post('/login', function(req, res){
  var data = req.body;
  db.one('SELECT * FROM users WHERE email = $1', [data.email]) // check if email is in the database
  .catch(function(){
    res.send('Email/Password not found')
  }).then(function(user){
    bcrypt.compare(data.password, user.password_digest, function(err, cmp){ // then check password
      if(cmp){
        req.session.user = user;
        res.redirect('/'); // redirect to the index page when user logged in
      } else {
        res.send('Email/Password not found')
      }
    })
  });
})

// logging out user
app.get('/logout', function(req,res){
  req.session.destroy(function(){
    res.redirect('/login'); // redirect to login page
  })
})
