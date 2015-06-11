require('es6-promise').polyfill();
require('whatwg-fetch');

var _ = require('lodash');
var PreloaderActions = require('../actions/PreloaderActions');

function Fetch(options) {

  var {
    url,
    method,
    success,
    fail,
    data
  } = options;

  var opts = {};
  opts.method = method || 'GET';

  if (data && typeof data === 'object') {
    if (opts.method === 'POST') {
      opts.body = JSON.stringify(data);
    } else if (opts.method === 'GET') {
      var params = _.map(data, function(v, k) {
        return `${k}=${v}`;
      }).join('&');
      url += `?${params}`;
    }
  }

  PreloaderActions.show();

  fetch(url, opts)
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {
    if (success) {
      success(data);
    }
    PreloaderActions.hide();
  })
  .catch(function(err) {
    if (fail) {
      fail(err);
    }
    alert('error occured.');
    PreloaderActions.hide();
  });
}

module.exports = Fetch;
