// Express
var express = require('express');
var app = express();

// Server on port 8080
var port = process.env.PORT || 3000;

// Load server
app.listen(port, function() {
  console.log('Node app is running on port', port);
});

// Marvel API Package
// Copyright (c) 2014, Matt Hernandez matt@modulus.io
// Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.
// var api = require('marvel-api');
// // Hiding API Keys: https://gist.github.com/derzorngottes/3b57edc1f996dddcab25
// // Continue from Step 6
// // var public = config.PUBLIC_KEY;
// // var private = config.PRIVATE_KEY;


// Node Fetch (Use THIS or marvel-api)
var fetch = require('node-fetch');

// user login encryption
var bcrypt = require('bcryptjs'); // or just 'bcrypt', depending on what you installed

// Express Session
var session = require('express-session');

// setting a secret value for your sessions (cookies)
app.use(session({
  secret: 'marvelR0x31',
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
app.get('/api', function(req, res){
  var character = req.query.value;
  var api = 'https://gateway.marvel.com:443/v1/public/characters?name=' + character + '&ts=1&apikey=' + PUBLIC_KEY + '&hash=' + HASH;
  request.get({
    url: api,
    json: true,
  }, function(err, resp, data){
    res.json(data.results[0]) // adding 0 to test
  }
  )
})

// Routes
app.get('/', function(req,res){
  console.log('Index loaded');
  res.render('index');
})

// User routes (remember session, add info to db)
// Login, remember session
app.get('/login', function(req, res){
  var logged_in;
  var email;
  if(req.session.user){ // the session is remembered
    logged_in = true;
    email = req.session.user.email
  }
  var data = {
    'logged_in': logged_in, // for now, we'll set this value to always false
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
    });
  })
})

// Check db for user
app.post('/login', function(req, res){
  var data = req.body;
  // first check if email is in the database
  db.one('SELECT * FROM users WHERE email = $1', [data.email])
  .catch(function(){
    // res.send('User not found'); // not a a good message - make it ambiguous for hackers to guess what was wrong
    res.send('Email/Password not found')
  }).then(function(user){
    bcrypt.compare(data.password, user.password_digest, function(err, cmp){
      if(cmp){
        req.session.user = user;
        res.redirect('/');
      } else {
        res.send('Email/Password not found')
      }
    })
  });
})


// marvel.characters.findByName('spider-man')
//   .then(function(res) {
//     console.log('Found character ID', res.data[0].id);
//     return marvel.characters.comics(res.data[0].id);
//   })
//   .then(function(res) {
//     console.log('found %s comics of %s total', res.meta.count, res.meta.total);
//     console.log(res.data);
//   })
