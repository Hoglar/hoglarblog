'use strict';
// Const or let here? maybe even var?
const express = require('express');
var app = express();

// for å få med json filen post.json må jeg require den here, i can now use the blogPosts variable to acces my blogposts.
const blogPosts = require('./blogPost/post.json');

// Will use the template engine Jade to rende HTML, so here i set upp the app for jade.
// Jade er byttet til Pug, fikser meg derfor pug.
// view engine sets the template engine to use to render template files. will soon change to angular. But this will have to do
app.set('view engine', 'pug');
// views shows where the template files are located
app.set('views', __dirname + '/templates');
// Use app.render() to use render html from templates


// Here i set up so i can serve static files to the web page through my public folder. The public folder is now accesable to the browser. I also set in a fake address, i can now acces files wit /static/filename
app.use('/static', express.static('public'));


//



// Trenger og lage en funksjon som lager en liste av blogposts, helst de 10 siste eller noe. kan lage denne i en annen fil senere. 
// Har her en array med alle keys i blogposts
var postsArray = Object.keys(blogPosts);

var postList = postsArray.map((value) => {
    return blogPosts[value];
});



app.get('/', (req, res) => {
    res.render('index');
});



app.get('/blog/:title?', (req, res) => {
    // Ved å bruke req.params.title får post verdien som er i title
    var title = req.params.title;
    // Jeg lagrer blog posten med navnet til title til var post slik at jeg kan bruke den til å sende til fil. 
    var post = blogPosts[title];
    // sender her informasjon om og rendre blog.pug hvor jeg og sender en variabel "post" med informasjonen i variablen post fra denne funksjonen. Lager først en error message om titlen ikke finnes i blogPost.  
    if (!(title in blogPosts)) {
        res.render('blog', {posts: postList, postName: postsArray});
    } else {
        res.render('blogPost', {post: post});
    }
});



app.listen(8080, 'localhost' () => {

    console.log("server is up and running");
});
