'use strict';
const serverUserAuth = require('../serverUtilities/userAuth.js');



module.exports = function(app, dbs) {


    app.get("/api/notes/topics", function(req, res) {

        dbs.notes.listCollections().toArray(function(err, collections) {

            if (err) {
                console.log("Error in notesApi: " + err);
                res.json({"topics": ["Error!"]});
                return;
            }

        let collectionNames = [];
        collections.forEach(function(collection) {
                collectionNames.push(collection.name);
            })

            res.json({"topics": collectionNames});
        });
    });

    app.post("/api/notes/create", function(req, res) {
        console.log("Getting post request");

        let dataFromUser = req.body;

        let token = dataFromUser.auth.token;

        serverUserAuth(token, dbs, (results) => {
            if(results) {
                console.log("Kjør på!")
                // We save in collections based on topic.
                dbs.notes.collection(dataFromUser.topic.toLowerCase()).insertOne({
                    topic: dataFromUser.topic.toLowerCase(),
                    title: dataFromUser.title.toLowerCase(),
                    note: dataFromUser.note,
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
                        console.log("Succesfully inserted " + r.insertedCount + " Documents!");
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


    })

    return app;
};
