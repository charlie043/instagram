var {ActionTypes} = require('../constants');
var StoreFactory = require('./StoreFactory');
var Dispatcher   = require('../dispatcher');

var InstagramStore = StoreFactory.create({
  data: [],
  limit : 0,
  max   : 0,
  offset: 0,

  unit  : 5,

  member: 'all',
  filter: 'all',
  sort  : 'created'
});

InstagramStore.dispatchToken = Dispatcher.register(function(action) {
  switch (action.type) {
    case ActionTypes.SET_INSTAGRAM_DATA:
      var state = InstagramStore.getState();
      InstagramStore.setState({
        data: state.data.concat(action.data),
        max : action.max,
        offset: state.offset + action.data.length
      });
      break;
    case ActionTypes.SET_INSTAGRAM_STATE:
      InstagramStore.setState(action.state);
      break;
    default:
      // no-op
  }
});

module.exports = InstagramStore;
