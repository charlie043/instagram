var MongoClient = require('mongodb').MongoClient;

// Connection URL
var url = 'mongodb://localhost:27017/mogastagram';

exports.insert = function(_collection, data, callback) {
  MongoClient.connect(url, function(err, db) {
    if (err) {
      return callback(err);
    }

    var collection = db.collection(_collection);
    collection.insert(data, function(err, data) {
      db.close();
      return callback(err, data);
    });
  });
};
