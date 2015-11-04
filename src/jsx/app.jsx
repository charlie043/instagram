var React     = require('react');
var Router    = require('react-router');
var assign    = require('object-assign');
var {
  Route
} = Router;

var {
  Button
}  = require('react-bootstrap');;

var {
  Filter,
  Card,
  Preloader
} = require('./component');

var InstagramActions = require('./actions/InstagramActions');
var InstagramStore   = require('./stores/InstagramStore');

var App = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  _setState: function(state) {
    this.setState(state, this.onStateChange);
  },

  getInitialState: function() {
    return InstagramStore.initState();
  },

  componentDidMount: function() {
    InstagramStore.on('change:state', this._setState);
    this.initQuery();
  },

  componentWillUnmount: function() {
    InstagramStore.removeListener('change:state', this._setState);
  },

  initQuery: function() {
    var state = this.state;
    var router = this.context.router;
    var query  = router.getCurrentQuery();

    var _state = {};
    _state.member = query.member || state.member;
    _state.filter = query.filter || state.filter;
    _state.sort   = query.sort   || state.sort;
    _state.limit  = parseInt(query.limit) || state.unit;

    InstagramActions.setState(_state);
  },

  onStateChange: function() {
    var router = this.context.router;
    var path = router.getCurrentPathname();
    var query = router.getCurrentQuery();
    var state = this.state;

    if (
      query.member == state.member &&
      query.filter == state.filter &&
      query.sort   == state.sort   &&
      query.limit  == state.limit  &&
      state.offset != 0
    ) {
      return;
    }

    var query = {
      member: state.member,
      filter: state.filter,
      sort  : state.sort,
      limit : state.limit
    };

    router.transitionTo('Top', null, query);

    query.offset = state.offset;
    InstagramActions.fetch(query);
  },

  onChange: function(key, value) {
    var state = {};

    if (
      key === 'filter' ||
      key === 'member' ||
      key === 'sort'
    ) {
      state.data   = [];
      state.limit  = this.state.unit;
      state.offset = 0;
    }

    state[key] = value;

    InstagramActions.setState(state);
  },

  onClick: function() {
    var {
      max,
      limit,
      unit
    } = this.state;

    var _limit = (limit+unit < max) ? limit+unit : max;

    InstagramActions.setState({
      limit: _limit
    });
  },

  render: function() {

    var cards = this.state.data.map(function(data, index) {
      return (
        <Card key={index} data={data} />
      );
    });

    return (
      <div>
        <Preloader />
        <Filter onChange={this.onChange} />
        <div className='card-container container-fluid '>
          {cards}
        </div>
        <div className='count'>{this.state.offset}/{this.state.max}</div>
        <Button className='more' onClick={this.onClick} bsStyle='warning' bsSize='large'>More</Button>
      </div>
    );
  },
});

var routes = (
  <Route name='Top' path='/' handler={App}>
  </Route>
);

Router.run(routes, function(Handler, state) {
  React.render(<Handler />, document.body);
});
