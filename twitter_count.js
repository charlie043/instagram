
console.log('-start- ' + new Date());

var _ = require('lodash');
var config = require('./config');
var Twitter = require('twitter');
var async = require('async');

var client = new Twitter(config.twitter_dempa);

var tags = [
  '#NominateAK69',
  '#NominateAlexandros',
  '#NominateCrossfaith',
  '#NominateDempagumi',
  '#NominateGesuotome'
];

function tweet_total(tag, total, param, done) {
  param = param || {};

  param.count = 100;
  param.q = tag;

  client.get('search/tweets', param, function(err, data) {

   if (err) {
     done(err);
     return;
   }

   var _count = data.search_metadata.count;
   var next = data.search_metadata.next_results;

   total += _count;
   console.log(total);

   // end of recursive
   if (!next) {
     console.log(tag + ' : ' + total);
     done();
     return;
   }

   // split params
   next = next.replace('?', '');
   var nexts = next.split('&');
   var _next = _.reduce(nexts, function(ret, _data) {
     var param = _data.split('=');
     ret[param[0]] = param[1];
     return ret;
   }, {});

   // recursive
   setTimeout(function(){
    tweet_total(tag, total, _next, done);
   }, 6000);
 });
}

var series = [];
_.each(tags, function(tag) {
  series.push(function(done) {
    console.log(tag + '...');
    tweet_total(tag, 0, {}, done);
  });
});

async.series(series, function(err) {
  if (err) {
    console.log(err);
  }
  console.log('-finish- ' + new Date());
});
