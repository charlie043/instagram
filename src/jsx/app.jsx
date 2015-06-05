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
  Card
} = require('./component');

var InstagramActions = require('./actions/InstagramActions');
var InstagramStore   = require('./stores/InstagramStore');

var App = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  _setState: function(state) {
    this.setState(state);
  },

  getInitialState: function() {
    return InstagramStore.initState();
  },

  componentDidMount: function() {
    InstagramStore.on('change:state', this._setState);
    window.addEventListener('hashchange', this.onHashChange);
    this.onHashChange();
  },

  componentWillUnmount: function() {
    InstagramStore.removeListener('change:state', this._setState);
    window.removeEventListener('hashchange', this.onHashChange);
  },

  onHashChange: function() {
    var router = this.context.router;
    var query  = router.getCurrentQuery();

    query.limit = this.state.limit;
    InstagramActions.fetch(query);
  },

  onChange: function(e) {
    var router = this.context.router;
    var query  = router.getCurrentQuery();
    assign(query, e);
    router.transitionTo('Top', null, query);
  },

  onClick: function() {
    var state = this.state;
    state.limit = (state.limit+10 < this.state.max) ? state.limit + 10 : this.state.max;
    this.onHashChange();
  },

  render: function() {

    var cards = this.state.data.map(function(data, index) {
      return (
        <Card key={index} data={data} />
      );
    });

    return (
      <div>
        <Filter onChange={this.onChange} />
        <div className='card-container container-fluid '>
          {cards}
        </div>
        <div className='count'>{this.state.offset}/{this.state.max}</div>
        <Button className='more' onClick={this.onClick} bsStyle='warning' bsSize='large'>もっとみる</Button>
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
