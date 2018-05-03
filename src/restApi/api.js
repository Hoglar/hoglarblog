'use strict';


// To get to this from within the app i just fetch("api")

module.exports = function(app, dbs) {

    app.get('/api', function(req, res) {
        res.json({
            color: "Magic"
        });
        console.log("app call");
    });

    app.get('/api/dictionary?id', function(req, res) {

        console.log("Getting dictionary search");
        console.log(req.params.id);
    });

    return app;
};
