var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('react');
});

router.get('/error', (req, res) => {
    res.render('error');
});

router.get("/about", (req, res) => {
    res.render('about');
});

router.get("/react", (req, res) => {
    res.render("react");
});

module.exports = router;
