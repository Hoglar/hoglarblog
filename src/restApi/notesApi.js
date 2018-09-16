'use strict';


module.exports = function(app, dbs) {


    app.get("/api/notes/topics", function(req, res) {

        console.log("Hello");
    });

    return app;
};
