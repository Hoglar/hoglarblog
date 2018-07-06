'use strict';
// To get to this from within the app i just fetch("api")
const serverUserAuth = require('../serverUtilities/userAuth.js');

module.exports = function(app, dbs) {


    // Burde kanskje lage post først, lære hvordan jeg lager documentene.

    // The search algorithm needs to be better. Just limited results to 5 now, but need to filter which 5 i get back!
    // Maybe base it on some scoring system. and maybe author.
    app.get('/api/dictionary/search', function(req, res) {

        if (req.query.searchData !== "") {
            let searchData = req.query.searchData.toLowerCase();
            let searchTopic = req.query.topic
            let regSearch = new RegExp(searchData);
            let query = { topic: searchTopic, title: regSearch }
            // dbs.dictionary.collection
            // Need to make a title search with searchData. maybe use regex?


            dbs.dictionary.collection(searchTopic).find(query).limit(5).toArray(function(err, result) {
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

        // Must send back message on complete or fail.!

        // Kan lage en auth funksjon her, server auth!
        let token = dataFromUser.auth.token;

        serverUserAuth(token, dbs, (results) => {
            if(results) {
                console.log("Kjør på!")
                // We save in collections based on topic.
                dbs.dictionary.collection(dataFromUser.topic).insertOne({
                    topic: dataFromUser.topic,
                    title: dataFromUser.title.toLowerCase(),
                    explanation: dataFromUser.explanation,
                    example: dataFromUser.example,
                    reference: dataFromUser.reference,
                    author: results,
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
            }
            else {
                console.log("Thats not Right, wont save that!");
                res.json({"failMessage": "Something wrong with userAuth"});
            }
        })
// Collection vil avhenge av hva de har valgt( html, css, etc)

    })

    return app;
};
