const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

module.exports = function (app, dbs) {

    app.get('/glossary', (req, res) => {

        dbs.hoglarBlog.collection('glossary').find({}).toArray(function (err, docs) {
            if (err) {
                console.log(err);
                res.error(err);
            } else {
                res.render("glossary", { docs: docs });
            }
        });
    });

    app.get('/glossary/:title', (req, res) => {
        var topic = req.params.title;

        dbs.hoglarBlog.collection('glossary').find({ "topic": topic }).toArray(function (err, docs) {
            if (err) {
                console.log("Its happening something on line 26");
            } else {
                var commentPlaceholder = "Type comment here, max 256 letters.";
                res.render("glossaryPost", { docs: docs, commentPlaceholder: commentPlaceholder });
            }
        });
    });

    app.post('/glossary/:title', [check("comment").isLength({ min: 10 }).isLength({ max: 256 }).trim(), check("author").isLength({ min: 2 }).isLength({ max: 20 }).trim()], (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            var topic = req.params.title;
            console.log(errors);
            dbs.hoglarBlog.collection('glossary').find({ "topic": topic }).toArray(function (err, docs) {
                if (docs.length == 0) {
                    res.render('index');
                    console.log("Cannot load from database");
                } else {

                    var commentPlaceholder = "Something went wrong with input. The comment must be over 10 characters long and max 256 characters. You must also write a name at Author name!";

                    res.render("glossaryPost", { docs: docs, commentPlaceholder: commentPlaceholder });
                }
            });
        } else {

            var topic = req.params.title;

            var commentSection = req.body.comment;
            var commentAuthor = req.body.author;
            var d = new Date().toISOString().slice(0, 10);

            // This section is for updating the comments in the glossary pages.
            var myquery = { "topic": topic };
            var newvalues = { $push: { comment: { $each: [{
                            "text": commentSection,
                            "author": commentAuthor,
                            "date": d

                        }], $slice: -6 } } };

            dbs.hoglarBlog.collection('glossary').updateOne(myquery, newvalues).then(() => {
                dbs.hoglarBlog.collection('glossary').find({ "topic": topic }).toArray(function (err, docs) {

                    if (err) {
                        console.log(err);
                        res.render("Something went wrong loading database");
                    } else {
                        var commentPlaceholder = "The post is uploaded!";
                        res.render("glossaryPost", { docs: docs, commentPlaceholder: commentPlaceholder });
                    }
                });
            });
        }
    });

    return app;
};