'use strict';
// To get to this from within the app i just fetch("api")
const serverUserAuth = require('../serverUtilities/userAuth.js');
const compareScore = require('../serverUtilities/compareScore.js');
const mongo = require('mongodb');
module.exports = function(app, dbs) {

    // The search algorithm needs to be better. Just limited results to 5 now, but need to filter which 5 i get back!
    // Maybe base it on some scoring system. and maybe author.
    app.get('/api/dictionary/search', function(req, res) {

        if (req.query.searchData !== "") {
            let searchData = req.query.searchData.toLowerCase();
            let searchTopic = req.query.topic.toLowerCase();
            let regSearch = new RegExp(searchData);
            let query = { topic: searchTopic, title: regSearch }
            // dbs.dictionary.collection
            // Need to make a title search with searchData. maybe use regex?

            // We need an algorithm here..

            dbs.dictionary.collection(searchTopic).find(query).toArray(function(err, result) {
                if(err) throw err;

                if (result.length > 0) {
                    // We got an array with objects.
                    // We sort it based on score and return the 5 first.
                    let returnArray = result.sort(compareScore);
                    returnArray = returnArray.splice(0,5);

                    // We need to iterate over the array to check the documentScore of all items in it.


                    res.json(returnArray);
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
                dbs.dictionary.collection(dataFromUser.topic.toLowerCase()).insertOne({
                    topic: dataFromUser.topic.toLowerCase(),
                    title: dataFromUser.title.toLowerCase(),
                    explanation: dataFromUser.explanation,
                    example: dataFromUser.example,
                    reference: dataFromUser.reference,
                    author: results,
                    documentScore: 0,
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

    app.post('/api/dictionary/delete', function(req, res) {

        // Input: Needs a auth token from client
        //        Needs data regarding wich document it shal delete.
        // Api will delete said document,

        // Returns successMessage on deletion.
        let dataFromUser = req.body;
        let token = dataFromUser.auth.token;

        serverUserAuth(token, dbs, (result) => {
            if(result) {
                dbs.dictionary.collection(dataFromUser.topic).deleteOne({_id: new mongo.ObjectId(dataFromUser.document_id)}, function(err, results) {
                        if (err) {
                            res.json({
                                "failMessage": "Something wrong in database"
                            })
                        }
                        else {
                            if(results.deletedCount) {
                                res.json({
                                    successMessage: "You have deleted document"
                                })
                            }
                            else {
                                res.json({
                                    failMessage: "Could not find document"
                                })
                            }
                        }
                    });
            }
            else {
                console.error("Something went wrong with user auth trying to delete dictionary collection.");
                res.json({"failMessage": "Something wrong with userAuth"});
            }
        })

    })

    return app;
};
