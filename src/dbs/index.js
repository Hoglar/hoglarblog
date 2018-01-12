'use strict';

var async = require('async');
var MongoClient = require('mongodb').MongoClient;

var hoglarBlog_URI = "mongodb://localhost:27017/hoglarBlog";

var database = {
    hoglarBlog: async.apply(MongoClient.connect, hoglarBlog_URI)
};

module.exports = function (cb) {
    async.parallel(database, cb);
}
