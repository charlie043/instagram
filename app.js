var _       = require('lodash');
var express = require('express');
var http    = require('http');
var path    = require('path');
var config  = require('./config');
var routes  = require('./routes/index');

var cache   = require('./cache');
var app     = express();

app.set('views', path.join(__dirname, 'src/jade'));
app.set('view engine', 'jade');
app.set('port', config.server.port);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/media', function(req, res) {
  var query = req.query;
  var data = cache.filter(query);
  console.log(data);
  res.send(data);
});

app.use('/', routes);

app.use(function(err, req, res, next) {
  res.send('charlie is not found :)');
});

app.listen(app.get('port'), function() {
  cache.update();
});
