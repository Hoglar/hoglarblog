'use strict';
// To get to this from within the app i just fetch("api")

module.exports = function(app, dbs) {

    app.get('/api', function(req, res) {
        res.json({
            color: "Magic"
        });
        console.log("app call");
    });

    // Burde kanskje lage post først, lære hvordan jeg lager documentene.

    app.get('/api/dictionary/search', function(req, res) {

        if (req.query.searchData !== "") {
            let searchData = req.query.searchData.toLowerCase();
            let searchTopic = req.query.topic
            let regSearch = new RegExp(searchData);
            let query = { topic: searchTopic, title: regSearch }
            // dbs.dictionary.collection
            // Need to make a title search with searchData. maybe use regex?


            dbs.dictionary.collection("test").find(query).toArray(function(err, result) {
                if(err) throw err;

                if (result.length > 0) {
                    res.json(result);
                }
                else {
                    res.json({searchMessage: "Nothing found"});
                }
            });
                // need to get a number of documents based on something.
                // need to send those documents back.
        }
        else {
            res.json({searchMessage: "Nothing found"});
        }
    });


    app.post('/api/dictionary/create', function(req, res) {
        // Må først hente data fra client.
        let dataFromUser = req.body;

        console.log(dataFromUser);
        // Must send back message on complete or fail.!


        // Collection vil avhenge av hva de har valgt( html, css, etc)
        dbs.dictionary.collection('test').insertOne({
            topic: dataFromUser.topic,
            title: dataFromUser.title,
            explanation: dataFromUser.explanation,
            example: dataFromUser.example,
            reference: dataFromUser.reference,
            date: new Date()
        }, function(err, r) {
            if (err) {
                console.log("Something went wrong with db connection");
                console.log(err);
                res.json({
                    failMessage: "Something went wrong with database"
                })
            }
            else {
                console.log("Succesfully insertet " + r.insertedCount + " Documents!");
                res.json({
                    successMessage: "You have saved to the database"
                })
            }
        });
    })

    return app;
};
