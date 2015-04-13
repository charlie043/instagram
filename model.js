var MongoClient = require('mongodb').MongoClient;
var config = require('./config');

// Connection URL
var url = config.db.host + config.db.name;

exports.insert = function(_collection, data) {
  MongoClient.connect(url, function(err, db) {

    if (err) {
      return err;
    }

    var collection = db.collection(_collection);
    collection.update({id: data.id}, data, {upsert: true}, function(err) {
      db.close();
    });
  });
};

exports.get = function(_collection, callback) {
  MongoClient.connect(url, function(err, db) {
    if (err) {
      return callback(err);
    }

    var collection = db.collection(_collection);
    collection.find().toArray( function(err, data) {
      db.close();
      return callback(err, data);
    });
  });
};
