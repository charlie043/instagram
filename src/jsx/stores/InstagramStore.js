var {ActionTypes} = require('../constants');
var StoreFactory = require('./StoreFactory');
var Dispatcher   = require('../dispatcher');

var InstagramStore = StoreFactory.create({
  data: [],
  limit : 10,
  max   : 0,
  offset: 0
});

InstagramStore.dispatchToken = Dispatcher.register(function(action) {
  switch (action.type) {
    case ActionTypes.SET_INSTAGRAM_DATA:
      InstagramStore.setState({
        data: action.data,
        max : action.max,
        offset: action.data.length
      });
      break;
    default:
      // no-op
  }
});

module.exports = InstagramStore;
