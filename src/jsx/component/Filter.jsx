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
          <option value='all'>全メンバー</option>
          <option value='moga'>最上もが</option>
          <option value='nemu'>夢眠ねむ</option>
          <option value='pinky'>藤咲彩音</option>
          <option value='risa'>相沢梨紗</option>
          <option value='mirin'>古川未鈴</option>
          <option value='eimi'>成瀬瑛美</option>
        </Input>
        <Input name='filter' className='filter' value={filter} type='select' onChange={this.onChange}>
          <option value='all'>すべて</option>
          <option value='image'>写真のみ</option>
          <option value='video'>動画のみ</option>
        </Input>
        <Input name='sort' className='sort' value={sort} type='select' onChange={this.onChange}>
          <option value='created'>最新順</option>
          <option value='like'>like多い順</option>
          <option value='comment'>コメント多い順</option>
        </Input>
    </div>
    );
  }
});

module.exports = Filter;
