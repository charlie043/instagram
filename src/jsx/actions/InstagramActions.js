var $ = require('jquery');
var {ActionTypes} = require('../constants');
var InstagramStore = require('../stores/InstagramStore');
var Dispatcher = require('../dispatcher');

var InstagramActions = {
  fetch: function(opts) {
    $.get('/api/media', opts, function(data) {
      Dispatcher.dispatch({
        type: ActionTypes.SET_INSTAGRAM_DATA,
        data: data.data,
        max : data.max
      });
    });
  },

  setState: function(state) {
    Dispatcher.dispatch({
      type: ActionTypes.SET_INSTAGRAM_STATE,
      state: state
    });
  }
};

module.exports = InstagramActions;
