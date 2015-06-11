var React     = require('react');
var PreloaderStore = require('../stores/PreloaderStore');

var Preloader = React.createClass({

  _setState: function(state) {
    this.setState(state);
  },

  getInitialState: function() {
    return PreloaderStore.initState();
  },

  componentDidMount: function() {
    PreloaderStore.on('change:state', this._setState);
  },

  componentWillUnmount: function() {
    PreloaderStore.removeListener('change:state', this._setState);
  },

  render: function() {
    return this.state.show ?
      (
        <div className='Component_Preloader'>
          <p className='loading'>Now Loading...</p>
        </div>
      ) :
      null;
  }

});

module.exports = Preloader;
