'use strict';

module.exports = function(app, dbs) {
    app.get('/api', function(req, res) {
        res.json({
            color: "Red"
        });
        console.log("app call");
    });
    return app;
};
