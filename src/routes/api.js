'use strict';

module.exports = function(app, dbs) {
    app.get('/api', function(req, res) {
        res.send("Hello World");
        console.log("app call");
    });
    return app;
};
