var $         = require('jquery');
var _         = require('lodash');
var React     = require('react');
var Bootstrap = require('react-bootstrap');
var Button    = Bootstrap.Button;
var Input     = Bootstrap.Input;


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

    window.sendLover = function() {console.log('へー。');};
    console.log('Hi, thank you for comming here!');
    console.log('Charlie loves moga.');
    console.log('Who is your lover?');
    console.log('execute this! "sendLover([name of your lover]);"');
    console.log('sendLover("moga")');
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

  onChange: function(key) {
    var self = this;
    return function(e) {
      var state = self.state;
      state[key] = e.target.value;
      state.index = 10;
      $(window).scrollTop(0);
      self.setState(state, self.getData);
    }
  },

  render: function() {

    if (!this.state.data.length) {
      return (<div className='loading'>loading, please wait...</div>);
    }

    var cards = this.state.data.map(function(image) {
      var content = (image.type === 'video') ? (<video src={image.url} controls />) : (<img src={image.url} />) ;
      return (
        <div key={image.id} className='card col'>
          <img className='profile' src={image.profile} />
          <a href={image.link} target='_blank'>
            {content}
          </a>
          <div className='like-comment'>
            <span className='like'><i className="fa fa-heart"></i>{image.like} likes</span>
            <span className='commnet'><i className="fa fa-comment"></i>{image.comment} comments</span>
            <div className='caption'>
              {image.text}
            </div>
          </div>
        </div>
      );
    });

    return (
      <div>
        <Input className='member' type='select' onChange={this.onChange('member')}>
          <option value='all'>全メンバー</option>
          <option value='moga'>最上もが</option>
          <option value='nemu'>夢眠ねむ</option>
          <option value='pinky'>藤咲彩音</option>
          <option value='risa'>相沢梨紗</option>
          <option value='mirin'>古川未鈴</option>
          <option value='eimi'>成瀬瑛美</option>
          <option value='mohuku'>もふくちゃん</option>
        </Input>
        <Input className='filter' type='select' onChange={this.onChange('filter')}>
          <option value='all'>すべて</option>
          <option value='image'>写真のみ</option>
          <option value='video'>動画のみ</option>
        </Input>
        <Input className='sort' type='select' onChange={this.onChange('sort')}>
          <option value='created'>最新順</option>
          <option value='like'>like多い順</option>
          <option value='comment'>コメント多い順</option>
        </Input>
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
