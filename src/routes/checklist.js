const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');


module.exports = function(app, dbs) {
    
    //Making a route for /checklist. Here i want to display the updated version of the checklist. To get acces to post i should have some password?
    app.get('/checklist', (req, res) => {
        //The checklist needs a list of todos, this i will get from database. We can make an array and fill it with items from database.
        dbs.hoglarBlog.collection('checklist').find({}).toArray((err, todoList) => {
            if (err) {
                console.log(err);
                res.error(err);
            } else {
                // we now got an array called todoList we can display. 
                res.render("checklist", { todoList : todoList });
                console.log(todoList);
            }
            
        }); 
    });
    
    
};