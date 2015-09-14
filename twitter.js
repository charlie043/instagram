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
  '頑張れでんぱ組',
  'イタリアに行って欲しいでんぱ組',
  '僕は応援するでんぱ組',
  '負けないでんぱ組',
  '明日にむかってでんぱ組',
  '未来に駆け出せでんぱ組',
  '世界をとれ、でんぱ組',
  'ビールがおいしいでんぱ組',
  '全力で応援でんぱ組',
  '昨日を超えてけでんぱ組',
  'えいたそかわいいでんぱ組',
  'もがちゃん可愛いでんぱ組',
  'もがちゃん一番可愛いでんぱ組',
  'もがちゃん最高に可愛いでんぱ組',
  'もがちゃんちゅきちゅきでんぱ組',
  'みりんも可愛いでんぱ組',
  'ねむきゅん可愛いでんぱ組',
  'ピンキー可愛いでんぱ組',
  'がおー',
  'おはんきー！',
  'りさちゃん可愛いでんぱ組',
  'ほえぇ〜',
  'あー',
  '頑張れ',
  '獲れよ',
  '絶対に',
  '集計方法はいかに',
  'どこにでもいきたいよ',
  'がんばれー！！！！',
  '世界へ',
  '俺がキミを世界に',
  '頑張ろう',
  'もがちゃん',
  'りさちゃん',
  'みりんちゃん',
  'ねむキュン',
  'えいちゃん',
  'ピンちゃん',
  '疲れてきた',
  '最高の一日',
  'たがしかしイタリアには行けない',
  'その昔あるところにみりんさんとりささんがおりました',
  '最終的な集計を誰がどうするかが気になる。僕を雇って欲しい。',
  'もうなんていうか自動化とかそういう戦いなのかこれは？',
  'もがちゃんはかわいいですが、もがちゃんはかわいいでしょうか？'
];

var tag = '#MTVEMA #NominateDempagumi';
var _word = '';

function _tweet() {

   var word =  _.sample(text) + ' ' + tag;

   if (word === _word) {
     _tweet();
      return;
   }

   _word = word;

   client.post('statuses/update', {
    status: word
  }, function() {
    console.log('success: ' + word);
  }, function() {
    console.log('fail: ' + word);
  });
}

_tweet();

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
