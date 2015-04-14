var React     = require('react');
var Bootstrap = require('react-bootstrap');
var Button    = Bootstrap.Button;
var Input     = Bootstrap.Input;

var Filter = React.createClass({

  onChange: function(e) {
    var onChange = this.props.onChange;
    var name = e.target.name;
    var value = e.target.value;

    if (onChange) {
      var state = {};
      state[name] = value;
      onChange(state);
    }
  },

  render: function() {
    return (
      <div className='filters'>
        <Input name='member' className='member' type='select' onChange={this.onChange}>
          <option value='all'>全メンバー</option>
          <option value='moga'>最上もが</option>
          <option value='nemu'>夢眠ねむ</option>
          <option value='pinky'>藤咲彩音</option>
          <option value='risa'>相沢梨紗</option>
          <option value='mirin'>古川未鈴</option>
          <option value='eimi'>成瀬瑛美</option>
          <option value='mohuku'>もふくちゃん</option>
        </Input>
        <Input name='filter' className='filter' type='select' onChange={this.onChange}>
          <option value='all'>すべて</option>
          <option value='image'>写真のみ</option>
          <option value='video'>動画のみ</option>
        </Input>
        <Input name='sort' className='sort' type='select' onChange={this.onChange}>
          <option value='created'>最新順</option>
          <option value='like'>like多い順</option>
          <option value='comment'>コメント多い順</option>
        </Input>
    </div>
    );
  }
});

module.exports = Filter;
