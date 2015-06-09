
var _       = require('lodash');
var model   = require('./model');

var cache = [];
var updated = Date.now();

exports.get = function get() {
  if (Date.now() - updated > 1000 * 60 * 60) {
    this.update();
  }
  return cache;
}

exports.update = function update() {
  updated = Date.now();
  model.get('media', function(err, data) {
    cache = _.sortByOrder(data, 'created', false);
  });
}

exports.filter = function(query) {
  var data = this.get();
  var sort = query.sort || 'created';
  var member = query.member;
  var filter = query.filter;
  var limit  = parseInt(query.limit);
  var offset = parseInt(query.offset);

  // member filter
  if (member && member !== 'all') {
    data = _.filter(data, {member: member});
  }

  // media filter
  if (filter && filter !== 'all') {
    data = _.filter(data, {type: filter});
  }

  data = _.sortByOrder(data, sort, false);
  var max = data.length;

  data = _.slice(data, offset, limit);

  return {data: data, max: max};
}
