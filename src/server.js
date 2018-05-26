'use strict';

// Requiring Dependencies
const express = require('express');
var app = express();
const MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var initializeDatabases = require("./dbs");
const crypto = require('crypto');
const path = require('path');
//Requiring apiRouter
const dictionaryApi = require('./restApi/dictionaryApi.js');


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


// We need to serve a public folder to the page, we use index.html as start, this then has acces to the public folder.
app.use('/static', express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// I should have separate create account page.

initializeDatabases(function(err, dbs) {
    if (err) {
        console.log("Failed to make database connection!");
        console.error(err);
        process.exit(1);
    }
    // Updating app with the routes.

    dictionaryApi(app, dbs);

    app.listen(8080, 'localhost', () => {

    console.log("server is up and running");

    });

});
