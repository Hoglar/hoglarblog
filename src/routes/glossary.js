var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;

const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

var mongodb;

createMongoDbConnection();

router.get('/', (req, res) => {
    
    
        
    if(mongodb != null && mongodb != undefined) {
        
        mongodb.collection('glossary').find({}).toArray(function(err, docs) {

            res.render("glossary", {docs : docs});
          
        });
    }
        
});

router.get('/:title', (req, res) => {
    
    if(mongodb != null && mongodb != undefined) {
        
        var topic = req.params.title;
        
        mongodb.collection('glossary').find({ "topic": topic}).toArray(function(err, docs) {
            if (docs.length == 0) {
                res.render('index');
            } else {
                res.render('glossaryPost', { docs : docs });
            }
        });
        
    }
});

router.post('/:title', [
    check("comment").isLength({ min: 8 }).isLength({ max: 250 })
    .trim(),
    
    check("author").isLength({ min: 2}).isLength({ max: 20 }).trim()
], (req, res) => {
     
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        
        var topic = req.params.title;
        
        mongodb.collection('glossary').find({ "topic": topic}).toArray(function(err, docs) {
            if (docs.length == 0) {
                res.render('index');
            } else {
                res.render('glossaryPost', {docs : docs});
            }
        });
    } else {
        
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
        
        mongodb.collection('glossary').updateOne(myquery, newvalues, function(err, res) {
            if (err) throw err;
            console.log('1 document updated');
        });
        
        mongodb.collection('glossary').find({"topic": topic}).toArray(function(err, docs) {
            
            
            if (docs.length == 0) {
                
                res.render('index');
                
            }
            else
            {   
                res.render("glossaryPost", {docs : docs});
                
            }    
        });
    }
});

function createMongoDbConnection() {
    if(MongoClient != null && MongoClient != undefined) {
        MongoClient.connect('mongodb://localhost:27017/hoglarBlog', function(error, dbInstance) {
            if(error){
                console.log("Error loading database");
                mongodb = null;
            } else {
                console.log("Connected to database through listen function.");
                mongodb = dbInstance;
            }
        });
    }
}



module.exports = router;