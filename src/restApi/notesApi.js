'use strict';
const serverUserAuth = require('../serverUtilities/userAuth.js');
const compareScore = require('../serverUtilities/compareScore.js');
const updateNoteScoreRead = require('../serverUtilities/updateNoteScoreRead.js');
const mongo = require('mongodb');

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
                // We save in collections based on topic.
                dbs.notes.collection(dataFromUser.topic.toLowerCase()).insertOne({
                    topic: dataFromUser.topic.toLowerCase(),
                    title: dataFromUser.title.toLowerCase(),
                    note: "",
                    author: results,
                    score: {
                        likes: [],
                        timesRead: 0,
                        popularity: 0
                    },
                    date: new Date()
                }, function(err, result) {
                    if (err) {
                        console.log("Something went wrong with db connection");
                        console.log(err);
                        res.json({
                            failMessage: "Something went wrong with database"
                        })
                    }
                    else {
                        console.log(result.ops[0]);
                        console.log("Succesfully inserted " + result.insertedCount + " Documents!");
                        res.json({
                            successMessage: "You have saved to the database",
                            insertedDocument: result.ops[0]
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

    app.post("/api/notes/createTopic", function(req, res) {
        console.log("Getting post request");

        let dataFromUser = req.body;

        let token = dataFromUser.auth.token;

        serverUserAuth(token, dbs, (results) => {
            if(results) {
                console.log("Kjør på!")
                // We save in collections based on topic.
                dbs.notes.collection(dataFromUser.topic.toLowerCase()).insertOne({
                    topic: dataFromUser.topic.toLowerCase(),
                    note: "Created new topic",
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

    app.get("/api/notes/notesSearch", function(req, res) {
        let searchData = req.query.searchData.toLowerCase();
        let searchTopic = req.query.topic.toLowerCase();
        let regSearch = new RegExp(searchData);
        let query = { topic: searchTopic, title: regSearch }

        dbs.notes.collection(searchTopic).find(query).toArray(function(err, result) {
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
    })

    app.post("/api/notes/commentSearch", function(req, res) {
        console.log("Ggetting here?");
        let _id = req.body._id
        let searchTopic = req.body.topic.toLowerCase();
        let query = {_id: new mongo.ObjectId(_id)}

        dbs.notes.collection(searchTopic).find(query).toArray(function(err, result) {
            if(err) throw err;

            if (result) {
                console.log(result);
                // We got an array with objects.
                // We sort it based on score and return the 5 first.
                // We need to iterate over the array to check the documentScore of all items in it.
                res.json(result[0]);
            }
            else {
                res.json({searchMessage: "Nothing found"});
            }
        });
    })

    app.post("/api/notes/updateComment", function(req, res) {
        let dataFromUser = req.body;
        let token = dataFromUser.auth.token;

        serverUserAuth(token, dbs, (results) => {
            if(results) {
                dataFromUser.comment.author = results;
                dbs.notes.collection(dataFromUser.topic).updateOne(
                    {_id: new mongo.ObjectId(dataFromUser.document_id)},
                    {$push: {comments: dataFromUser.comment}}
                )
                .then(
                    function(result) {

                        if(result.modifiedCount) {
                            res.json({"successMessage": "Document Deleted"});
                        }
                        else {
                            res.json({"failMessage": "Could not find document."});
                        }
                    }
                )
                .catch(function(err) {
                    console.error(err);
                    res.json({"failMessage": "Error trying to update document"});
                })
            }
            else {
                res.json({"failMessage": "Error autherize user!"});
            }
        });
    })

    app.post("/api/notes/updateNote", function(req, res) {
        console.log("Getting update request");
        let dataFromUser = req.body;
        let token = dataFromUser.auth.token;

        serverUserAuth(token, dbs, (results) => {
            if(results) {

                dbs.notes.collection(dataFromUser.topic).findOneAndUpdate(
                    {_id: new mongo.ObjectId(dataFromUser.document_id)},
                    {$set: {
                        note: dataFromUser.newNote
                        }
                    },
                    {
                        returnOriginal : false,
                    }
                )
                .then(
                    function(result) {

                        if(result.lastErrorObject.updatedExisting) {
                            res.json({"successMessage": "Document Updated",
                                      "updatedDocument": result.value});
                        }
                        else {
                            res.json({"failMessage": "Could not find document."});
                        }
                    }
                )
                .catch(function(err) {
                    console.error(err);
                    res.json({"failMessage": "Error trying to update document"});
                })
            }
            else {
                res.json({"failMessage": "Error trying to update document"});
            }
        });
    })

    app.post("/api/notes/deleteNote", function(req, res) {
        console.log("Getting delete request");
        let dataFromUser = req.body;
        let token = dataFromUser.auth.token;

        serverUserAuth(token, dbs, (results) => {
            if(results) {

                dbs.notes.collection(dataFromUser.topic).deleteOne(
                    {_id: new mongo.ObjectId(dataFromUser.document_id)}
                )
                .then(
                    function(result) {

                        if(result.deletedCount) {
                            res.json({"successMessage": "Document Deleted"});
                        }
                        else {
                            res.json({"failMessage": "Could not delete document."});
                        }
                    }
                )
                .catch(function(err) {
                    console.error(err);
                    res.json({"failMessage": "Error trying to delete document"});
                })
            }
            else {
                res.json({"failMessage": "Error trying to update document"});
            }
        });
    })

    app.post("/api/note/updateTimesRead", function(req, res) {

        let data = req.body;
        updateNoteScoreRead(dbs, data.topic.toLowerCase(), data.document_id)
        .then(
            (response) => {
                res.send("updated document read score");
            }
        )
    })

    return app;
};
