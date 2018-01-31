var express = require('express');
var router = express.Router();



router.get('/', (req, res) => {
    res.render('index');
});

router.get('/error', (req, res) => {
    res.render('error');
})

module.exports = router;