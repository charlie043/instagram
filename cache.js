
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

exports.filter = function(member, filter, sort, index) {
  var data = this.get();
  sort = sort || 'created';
  index = (index === 'max') ? data.length : index ;
  index = ~~index;

  if (member) {
    data = _.filter(data, {member: member});
  }

  if (filter) {
    data = _.filter(data, {type: filter});
  }

  data = _.sortByOrder(data, sort, false);

  data = _.slice(data, 0, index);

  return data;
}
