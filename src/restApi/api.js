'use strict';


// To get to this from within the app i just fetch("api")

module.exports = function(app, dbs) {

    app.get('/api', function(req, res) {
        res.json({
            color: "Magic"
        });
        console.log("app call");
    });

    app.get('/api/dictionary/', function(req, res) {
        let searchData = req.query.search;
        console.log(searchData);

        // dbs.dictionary.collection

        res.json({
            welcome: "Hello, you made a request to the dictionary!",
            data: "Data not yet connected"
        });
    });

    return app;
};
