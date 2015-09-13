var _ = require('lodash');
var config = require('./config');
var Twitter = require('twitter');

var client = new Twitter(config.twitter_dempa);

//client.get('statuses/user_timeline', {
//  screen_name: 'charlie043'
//}, function(err, data, res) {
//  if (err) {
//    console.log(err);
//    return;
//  }
//
//  console.log(JSON.stringify(data, null, 2));
//  console.log(data.length);
//});

var text = [
];

client.post('statuses/update', {
  status: 'aaa'
})

//client.stream('user', {
//}, function(stream) {
//  stream.on('data', function(tweet) {
//    if (tweet.user && tweet.user.screen_name === 'mogatanpe') {
//      client.post('statuses/update', {
//        status: _.sample(text)
//      });
//    }
//  });
//
//
//  stream.on('error', function(err) {
//    console.log(err);
//  });
//});

//client.post('statuses/update', {
//  status: 'ああああああああああああ'
//}, function(err, data, res) {
//  if (err) {
//    console.log(err);
//    return;
//  }
//  console.log(data);
//});
