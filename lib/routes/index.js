'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('index');
});

router.get('/error', function (req, res) {
    res.render('error');
});

router.get("/about", function (req, res) {
    res.render('about');
});

module.exports = router;