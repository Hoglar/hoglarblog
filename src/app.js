'use strict';

// Requiring Dependencies
const express = require('express');
var app = express();
const MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require('body-parser');
var initializeDatabases = require("./dbs");


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Requiring routes
var glossaryRoute = require("./routes/glossary");
var indexPage = require('./routes/index');

var checklistPage = require("./routes/checklist");

// view engine sets the template engine to use to render template files.
app.set('view engine', 'pug');
// views shows where the template files are located
app.set('views', __dirname + '/templates');
// Use app.render() to use render html from templates


// Here i set up so i can serve static files to the web page through my public folder. The public folder is now accesable to the browser. I also set in a fake address, i can now acces files wit /static/filename
app.use('/static', express.static('public'));

// dette er route til index
app.use('/', indexPage);

// Setter her opp route til glossary posts, bruker :title for å få tak i den trykte linken. 

initializeDatabases(function(err, dbs) {
    if (err) {
        console.log("Failed to make database connection!");
        console.error(err);
        process.exit(1);
    }
    // Updating app with the routes.
    glossaryRoute(app, dbs);
    checklistPage(app, dbs);
    
    app.listen(8080, 'localhost', () => {

    console.log("server is up and running");
    
    });
    
});