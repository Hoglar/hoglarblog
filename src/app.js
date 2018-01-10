'use strict';

// Requiring Dependencies
const express = require('express');
var app = express();
const MongoClient = require('mongodb').MongoClient;
var mongodb;
var assert = require('assert');
var bodyParser = require('body-parser');

const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
// require body parser

//Requiring routes
var indexPage = require('./routes/index');
var glossaryPage = require('./routes/glossary');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// view engine sets the template engine to use to render template files.
app.set('view engine', 'pug');
// views shows where the template files are located
app.set('views', __dirname + '/templates');
// Use app.render() to use render html from templates


// Here i set up so i can serve static files to the web page through my public folder. The public folder is now accesable to the browser. I also set in a fake address, i can now acces files wit /static/filename
app.use('/static', express.static('public'));

// dette er route til index
app.use('/', indexPage);
// Setter her opp route til glossary page.
app.use('/glossary', glossaryPage);

// Setter her opp route til glossary posts, bruker :title for å få tak i den trykte linken. 


// Lager her en route til wow siden min hvor jeg skal lage kjappe guides til encounters, informasjonen skal lagres på database.

app.listen(8080, 'localhost', () => {

    console.log("server is up and running");
    
});



