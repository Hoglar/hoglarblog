'use strict';

var _require = require('express-validator/check'),
    check = _require.check,
    validationResult = _require.validationResult;

var _require2 = require('express-validator/filter'),
    matchedData = _require2.matchedData,
    sanitize = _require2.sanitize;

var crypto = require('crypto');

module.exports = function (app, dbs) {

    //Making a route for /checklist. Here i want to display the updated version of the checklist. To get acces to post i should have some password?
    app.get('/checklist', function (req, res) {
        //The checklist needs a list of todos, this i will get from database. We can make an array and fill it with items from database.
        dbs.hoglarBlog.collection('checklist').find({}).toArray(function (err, todoList) {
            if (err) {
                console.log(err);
                res.error(err);
            } else {
                // we now got an array called todoList we can display.
                res.render("checklist", { todoList: todoList });
            }
        });
    });

    app.post('/updateChecklist', [check("addItem").isLength({ min: 5 }).isLength({ max: 100 }).trim(), check("addDescription").isLength({ max: 256 }).trim(), check("todoSecret").isLength({ min: 2 })], function (req, res) {

        // First we do a validationcheck on the input.
        var error = validationResult(req);

        if (!error.isEmpty()) {
            res.render('error');
        } else {

            var passwordTry = req.body.todoSecret;

            dbs.hoglarBlog.collection('secretsKeepOut').find({}).toArray(function (err, passwords) {

                var hash = crypto.createHash('sha256').update(passwordTry).digest('hex');

                if (hash == passwords[0]["martin"]) {
                    var todoItem = req.body.addItem;
                    var todoDescription = req.body.addDescription;

                    dbs.hoglarBlog.collection('checklist').insertOne({

                        "task": todoItem,
                        "description": todoDescription,
                        "complete": false
                    }).then(function () {

                        dbs.hoglarBlog.collection('checklist').find({}).toArray(function (err, todoList) {
                            if (err) {
                                console.log(err);
                                res.error(err);
                            } else {
                                res.render("checklist", { todoList: todoList });
                            }
                        });
                    });
                } else {
                    console.log("Someone typed wrong password");
                    res.render("error");
                }
            });
        }
    });

    app.post('/deleteChecklistItem', function (req, res) {

        var deletePasswordTry = req.body.deleteSecret;

        dbs.hoglarBlog.collection('secretsKeepOut').find({}).toArray(function (err, passwords) {

            passwords[0]["martin"];
            var hash = crypto.createHash('sha256').update(deletePasswordTry).digest('hex');

            if (hash == passwords[0]["martin"]) {
                var taskById = JSON.parse(req.body.deleteTask);

                var query = { "task": taskById.task };

                dbs.hoglarBlog.collection("checklist").deleteOne(query).then(function () {
                    dbs.hoglarBlog.collection('checklist').find({}).toArray(function (err, todoList) {
                        if (err) {
                            console.log(err);
                            res.error(err);
                        } else {
                            res.render("checklist", { todoList: todoList });
                        }
                    });
                });
            } else {
                console.log("Someone typed wrong password");
                res.render("error");
            }
        });
    });
};