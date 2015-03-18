var _       = require('lodash');
var express = require('express');
var http    = require('http');
var request = require('request');
var insta   = require('instagram-node').instagram();
var model   = require('./model');

var app     = express();

var ACCESS_TOKEN  = '30666661.f58a938.4b659c1866c3414cb2beff6320700e9f';
var CLIENT_ID     = 'f58a93869e6a41bf902f07e5152ff48d';
var CLIENT_SECRET = '824ea61cb8444a77a05a17a2cfb3fba8';

insta.use({
  client_id     : CLIENT_ID,
  client_secret : CLIENT_SECRET
});

function start() {
  var url = 'https://api.instagram.com/v1/users/14337530/media/recent?access_token=' + ACCESS_TOKEN;
  var index = 0;

  next(url);

  function next(url) {
    console.log('=== start_'+index+' ===');
    console.log(url);

    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var data = JSON.parse(body);
        var n = data.pagination.next_url;
        _.each(data.data, function(d) {
          var image = d.images.standard_resolution;
          var insert = {
            id     : d.id,
            url    : image.url,
            width  : image.width,
            height : image.height,
            like   : d.likes.count,
            link   : d.link,
            created: d.created_time,
            comment: d.comments.length
          };
          model.insert('photos', insert, function(err) {
            if (err)
              console.log(err);
          });
        });

        if (n) {
          return next(n);
        }

        console.log('==  end  ==');
      }
    });
   }
}

start();

// http.createServer(app).listen(8000);
