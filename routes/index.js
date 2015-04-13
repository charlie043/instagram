var _ = require('lodash');

var express = require('express');
var cache = require('../cache');

var router = express.Router();

router.get('/', function(req, res) {
  var data = cache.get();
  var url = data[0].url;
  var _data = _.slice(data, 0, 50);
  res.render('index', {
    og_image: url,
    data: _data
  });
});

module.exports = router;
