var express = require('express');
var router = express.Router();



router.get('/', (req, res) => {
    
    var todoList = ["item1", "item2", "item3"];
    
    res.render('checklist', { todoList : todoList});
});

module.exports = router;