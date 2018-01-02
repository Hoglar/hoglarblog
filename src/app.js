'use strict';
// Const or let here? maybe even var?
const express = require('express');
var app = express();
const MongoClient = require('mongodb').MongoClient;
var assert = require('assert');


// require body parser

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// require express-validator

const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');



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

// Trenger og lage en funksjon som lager en liste av blogposts, helst de 10 siste eller noe. kan lage denne i en annen fil senere. 
// Har her en array med alle keys i blogposts
var postsArray = Object.keys(blogPosts);


var postList = postsArray.map((value) => {
    return blogPosts[value];
});

// dette er route til index
app.get('/', (req, res) => {
    res.render('index');
});




app.get('/glossary', (req, res) => {
    MongoClient.connect('mongodb://localhost:27017/hoglarBlog', (err, db) => {
        
        db.collection('glossary').find({}).toArray(function(err, docs) {
            
            assert.equal(err, null);
            assert.notEqual(docs.length, 0);
            
            res.render("glossary", {docs : docs});
        });   
    });
});

app.get('/glossary/:title', (req, res) => {
    MongoClient.connect('mongodb://localhost:27017/hoglarBlog', (err, db) => {
        
        var topic = req.params.title;
        
        db.collection('glossary').find({"topic": topic}).toArray(function(err, docs) {
            
            if (docs.length == 0) {
                
                res.render('index');
            }
            else
            {
                res.render("glossaryPost", {docs : docs});
            }    
        });
    });
});

app.post('/glossary/:title', [
    
    check("comment").isLength({ min: 8 }).isLength({ max: 250 })
    .trim(),
    
    check("author").isLength({ min: 2}).isLength({ max: 20 }).trim()
    
    
    
], (req, res) => {
    
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        
        MongoClient.connect('mongodb://localhost:27017/hoglarBlog', (err, db) => {
        
        var topic = req.params.title;
        
        db.collection('glossary').find({"topic": topic}).toArray(function(err, docs) {
            
            if (docs.length == 0) {
                
                res.render('index');
            }
            else
            {
                res.render("glossaryPost", {docs : docs});
            }    
        });
    });
        
    }
    
    else {
        
        MongoClient.connect('mongodb://localhost:27017/hoglarBlog', (err, db) => {
        
        var topic = req.params.title;
        
        var commentSection = req.body.comment;
        var commentAuthor = req.body.author;
        var d = new Date().toISOString().slice(0,10);
        
        
        // This section is for updating the comments in the glossary pages.
        var myquery = { "topic": topic };
        var newvalues = { $push: { comment: { $each: [ { 
            "text" : commentSection,
            "author": commentAuthor,
            "date": d
             
        } ], $slice: -6  } } };
        
        
        
        db.collection('glossary').updateOne(myquery, newvalues, function(err, res) {    
            if (err) throw err;
            console.log("1 document updated");
            db.close();
        });
        
        db.collection('glossary').find({"topic": topic}).toArray(function(err, docs) {
            
            
            if (docs.length == 0) {
                
                res.render('index');
                
            }
            else
            {   
                res.render("glossaryPost", {docs : docs});
                
            }    
        });
    });
        
    } 
});






// Lage ny route til hoglar/blog



app.get('/blog/:title?', (req, res) => {
    // Ved å bruke req.params.title får post verdien som er i title
    var title = req.params.title;
    // Jeg lagrer blog posten med navnet til title til var post slik at jeg kan bruke den til å sende til fil. 
    var post = blogPosts[title];
    // sender her informasjon om og rendre blog.pug hvor jeg og sender en variabel "post" med informasjonen i variablen post fra denne funksjonen. Lager først en error message om titlen ikke finnes i blogPost.  
    if (!(title in blogPosts)) {
        res.render('blog', {posts: postList, postName: postsArray, inBlog: true});
    } else {
        res.render('blogPost', {post: post, glossary : glossary, inBlogPost: true});
    }
});



// Lager her en route til wow siden min hvor jeg skal lage kjappe guides til encounters, informasjonen skal lagres på database.

app.listen(8080, 'localhost', () => {

    console.log("server is up and running");
});
