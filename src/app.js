'use strict';
// Const or let here? maybe even var?
const express = require('express');
var app = express();

// Will use the template engine Jade to rende HTML, so here i set upp the app for jade.
// Jade er byttet til Pug, fikser meg derfor pug.
// view engine sets the template engine to use to render template files. will soon change to angular. But this will have to do
app.set('view engine', 'pug');
// views shows where the template files are located
app.set('views', __dirname + '/templates');
// Use app.render() to use render html from templates


// Here i set up so i can serve static files to the web page through my public folder. The public folder is now accesable to the browser. I also set in a fake address, i can now acces files wit /static/filename
app.use('/static', express.static('public'));


app.get('/', (req,res) => {
    res.render('index');
});

app.listen(8080, 'localhost', () => {
    console.log("server is up and running");
});
