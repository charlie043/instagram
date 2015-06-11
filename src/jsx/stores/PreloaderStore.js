var {ActionTypes} = require('../constants');
var StoreFactory = require('./StoreFactory');
var Dispatcher   = require('../dispatcher');

var PreloaderStore = StoreFactory.create({
  show: false
});

PreloaderStore.dispatchToken = Dispatcher.register(function(action) {
  switch (action.type) {
    case ActionTypes.SHOW_PRELOADER:
      PreloaderStore.setState({show: true});
      break;
    case ActionTypes.HIDE_PRELOADER:
      PreloaderStore.setState({show: false});
      break;
    default:
      // no-op
  }
});

module.exports = PreloaderStore;
