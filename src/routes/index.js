var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/error', (req, res) => {
    res.render('error');
});

router.get("/about", (req, res) => {
    res.render('about');
})

router.get("/react") => {
    res.render("react")
}

module.exports = router;
