var $         = require('jquery');
var React     = require('react');
var Router    = require('react-router');
var Bootstrap = require('react-bootstrap');
var Button    = Bootstrap.Button;
var Input     = Bootstrap.Input;
var assign    = require('object-assign');
var Filter    = require('./component/Filter.jsx');
var Card      = require('./component/Card.jsx');

var App = React.createClass({

  getInitialState: function() {
    return {
      data : [], // show data
      index: 10,
      member: null,
      filter: null,
      sort  : 'created'
    };
  },

  componentDidMount: function() {
    this.getData();
  },

  getData: function() {
    $.get('/api/media', {
      member: this.state.member,
      filter: this.state.filter,
      sort  : this.state.sort,
      index : this.state.index
    }, this.handleData);
  },

  handleData: function(data) {
    this.setState({
      data: data
    });
  },

  onClick: function() {
    var index = 10 + this.state.index;
    this.setState({index: index}, this.getData);
  },

  onClickAll: function() {
    this.setState({index: 'max'}, this.getData);
  },

  onChange: function(state) {
    state.index = 10;
    this.setState(state, this.getData);
    $(window).scrollTop(0);
  },

  render: function() {

    if (!this.state.data.length) {
      return (<div className='loading'>loading, please wait...</div>);
    }

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
        <div className='count'>{this.state.index}/{this.state.data.length}</div>
        <Button className='more' onClick={this.onClick} bsStyle='warning' bsSize='large'>もっとみる</Button>
        <Button className='more' onClick={this.onClickAll} bsStyle='danger' bsSize='large'>すべて表示（重いですPC推奨）</Button>
      </div>
    );
  },
});

$(function() {
  React.render(<App />, document.body);
});
