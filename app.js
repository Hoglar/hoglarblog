'use strict';

const express = require('express');
const app = express();

app.get('/', (req,res) => {
    res.send('<h1>Hoglar Blog</h1>');
});

app.listen(3000, () => {
    console.log("server is up and running");
});
