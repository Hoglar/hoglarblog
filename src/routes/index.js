var express = require('express');
var router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + 'index.html'));
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
