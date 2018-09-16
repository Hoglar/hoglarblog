'use strict';

// index.js under dbs is where i set up the databases, currently i only use one database, hoglarBlog and just use collections under this database for the different pages. Maybe i should make more databases?

var async = require('async');
var MongoClient = require('mongodb').MongoClient;

//var hoglarBlog_URI = "mongodb://localhost:27017/hoglarBlog";
var dictionary_URI = "mongodb://localhost:27017/dictionary";
const users_URI = "mongodb://localhost:27017/users";
const notes_URI = "mongodb://localhost:27017/notes";


var database = {
    //hoglarBlog: async.apply(MongoClient.connect, hoglarBlog_URI),
    dictionary: async.apply(MongoClient.connect, dictionary_URI),
    users: async.apply(MongoClient.connect, users_URI),
    notes: async.apply(MongoClient.connect, notes_URI)
};

module.exports = function (cb) {
    async.parallel(database, cb);
}
