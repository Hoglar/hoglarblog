'use strict';

// index.js under dbs is where i set up the databases, currently i only use one database, hoglarBlog and just use collections under this database for the different pages. Maybe i should make more databases?

var async = require('async');
var MongoClient = require('mongodb').MongoClient;

var hoglarBlog_URI = "mongodb://localhost:27017/hoglarBlog";

var database = {
    hoglarBlog: async.apply(MongoClient.connect, hoglarBlog_URI)
};

module.exports = function (cb) {
    async.parallel(database, cb);
}
