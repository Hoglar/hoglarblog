'use strict';

const express = require('express');
const app = express();

app.get('/', (req,res) => {
    res.send('<h1>Hoglar Blog, running on side</h1>\n <h2>Hei på deg</h2>');
});

app.listen(3000, () => {
    console.log("server is up and running");
});
