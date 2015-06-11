var {ActionTypes} = require('../constants');
var Dispatcher = require('../dispatcher');

var PreloaderActions = {
  show: function() {
    Dispatcher.dispatch({
      type: ActionTypes.SHOW_PRELOADER
    });
  },
  hide: function() {
    Dispatcher.dispatch({
      type: ActionTypes.HIDE_PRELOADER
    });
  },
};

module.exports = PreloaderActions;
