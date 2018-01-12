const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');


module.exports = function(app, dbs) {
    
    app.get('/glossary', (req, res) => {
        
        dbs.hoglarBlog.collection('glossary').find({}).toArray(function(err, docs) {
            if (err) {
                console.log(err);
                res.error(err);
            } else {
                res.render("glossary", {docs : docs});
            }
        });
    });


    app.get('/glossary/:title', (req, res) => {
        var topic = req.params.title;
        
        dbs.hoglarBlog.collection('glossary').find({ "topic": topic}).toArray(function(err, docs) {
            if (err) {
                console.log("Its happening something on line 26");
            } else {
                res.render("glossaryPost", { docs : docs });
            }
        });
    });
    
    
    app.post('/glossary/:title', [
    check("comment").isLength({ min: 8 }).isLength({ max: 250 })
    .trim(),
    
    check("author").isLength({ min: 2}).isLength({ max: 20 }).trim()
], (req, res) => {
     
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        
        var topic = req.params.title;
        
        dbs.hoglarBlog.collection('glossary').find({ "topic": topic}).toArray(function(err, docs) {
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
        
        dbs.hoglarBlog.collection('glossary').updateOne(myquery, newvalues, function(err, res) {
            if (err) throw err;
            console.log('1 document updated');
            
        });
        
        dbs.hoglarBlog.collection('glossary').find({"topic": topic}).toArray(function(err, docs) {
            
            if (err) {
                console.log(err);
                res.render("Something went wrong loading database"); 
            }
            else
            {   
                res.render("glossaryPost", {docs : docs});
            }    
        });
    }
});

            
return app;

};