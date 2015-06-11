var _ = require('lodash');
var config = require('./config');
var Twitter = require('twitter');

var client = new Twitter(config.twitter);

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
  '好きだ',
  '好きだ！',
  '好きだ!',
  '好きだッ',
  '好きだｯ',
  'スキだ',
  'スキだ！',
  'スキだｯ',
  '好きだ、',
  'スキダ',
  'スキなんだ！'
];

client.stream('user', {
}, function(stream) {
  stream.on('data', function(tweet) {
    if (tweet.user && tweet.user.screen_name === 'mogatanpe') {
      client.post('statuses/update', {
        status: _.sample(text)
      });
    }
  });
  stream.on('error', function(err) {
    console.log(err);
  });
});

//client.post('statuses/update', {
//  status: 'ああああああああああああ'
//}, function(err, data, res) {
//  if (err) {
//    console.log(err);
//    return;
//  }
//  console.log(data);
//});
