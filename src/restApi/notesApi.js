'use strict';


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

    return app;
};
