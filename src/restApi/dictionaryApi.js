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

    app.get('/api/dictionary/', function(req, res) {
        let searchData = req.query.search;
        console.log(searchData);

        // dbs.dictionary.collection

        res.json({
            welcome: "Hello, you made a request to the dictionary!",
            data: "Data not yet connected"
        });
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
