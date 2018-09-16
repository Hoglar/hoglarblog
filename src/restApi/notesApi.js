'use strict';


module.exports = function(app, dbs) {


    app.get("/api/notes/topics", function(req, res) {

        console.log("Hello");

        dbs.notes.listCollections().toArray(function(err, collections) {
    // collInfos is an array of collection info objects that look like:
    // { name: 'test', options: {} }
        let collectionNames = [];
        collections.forEach(function(collection) {
                collectionNames.push(collection.name);
            })
            console.log(collectionNames);
            res.json(collectionNames);
        });
    });

    return app;
};
