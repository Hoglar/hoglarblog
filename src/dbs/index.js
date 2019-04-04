'use strict';

// index.js under dbs is where i set up the databases.

// Should i still use async function?
var async = require('async');
var MongoClient = require('mongodb').MongoClient;

const dictionary_URI = "mongodb://localhost:27017/dictionary";
const users_URI = "mongodb://localhost:27017/users";
const notes_URI = "mongodb://localhost:27017/notes";
const metaData_URI = "mongodb://localhost:27017/metaData";

var database = {
    dictionary: async.apply(MongoClient.connect, dictionary_URI),
    users: async.apply(MongoClient.connect, users_URI),
    notes: async.apply(MongoClient.connect, notes_URI),
    metaData: async.apply(MongoClient.connect, metaData_URI)
};

module.exports = function (cb) {
    async.parallel(database, cb);
}
