var React     = require('react');
var Bootstrap = require('react-bootstrap');
var Button    = Bootstrap.Button;
var Input     = Bootstrap.Input;

var Filter = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  onChange: function(e) {
    var onChange = this.props.onChange;
    var name = e.target.name;
    var value = e.target.value;

    if (onChange) {
      onChange(name, value);
    }
  },

  render: function() {

    var router = this.context.router;
    var query  = router.getCurrentQuery();

    var member = query.member || 'all';
    var filter = query.filter || 'all';
    var sort   = query.sort   || 'created';

    return (
      <div className='Component_filter'>
        <Input name='member' className='member' value={member} type='select' onChange={this.onChange}>
          <option value='all'>All members</option>
          <option value='moga'>Moga Mogami</option>
          <option value='nemu'>Nemu Yumemi</option>
          <option value='pinky'>Ayane Fujisaki</option>
          <option value='risa'>Risa Aizawa</option>
          <option value='mirin'>Mirin Furukawa</option>
          <option value='eimi'>Eimi Naruse</option>
        </Input>
        <Input name='filter' className='filter' value={filter} type='select' onChange={this.onChange}>
          <option value='all'>All</option>
          <option value='image'>Photo</option>
          <option value='video'>Movie</option>
        </Input>
        <Input name='sort' className='sort' value={sort} type='select' onChange={this.onChange}>
          <option value='created'>Latest</option>
          <option value='like'>like</option>
          <option value='comment'>comment</option>
        </Input>
    </div>
    );
  }
});

module.exports = Filter;
