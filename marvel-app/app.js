// Express
var express = require('express');
var app = express();

// Server on port 8080
var port = process.env.PORT || 3000;

// Load server
app.listen(port, function() {
  console.log('Node app is running on port', port);
});

// PG -Promise
var pgp = require('pg-promise')();
var db = pgp(process.env.DATABASE_URL) || pgp('postgres://student_10@localhost:5432/marvel_crud');

// Mustache
var mustacheExpress = require('mustache-express');
app.engine('html', mustacheExpress());

// Views + Public Files
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use('/', express.static(__dirname + '/public'));

// // Method Override
var methodOverride = require('method-override');
app.use(methodOverride('_method'));

// // Body Parser
var bdPars = require('body-parser');
app.use(bdPars.urlencoded({ extended: false}));
app.use(bdPars.json());


