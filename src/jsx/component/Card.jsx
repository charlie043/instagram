
var React     = require('react');

var Card = React.createClass({

  render: function() {
    var data = this.props.data;
    var content = (data.type === 'video') ? (<video src={data.url} controls />) : (<img src={data.url} />) ;
    return (
      <div key={data.id} className='card col'>
        <img className='profile' src={data.profile} />
        <a href={data.link} target='_blank'>
          {content}
        </a>
        <div className='like-comment'>
          <span className='like'><i className="fa fa-heart"></i>{data.like} likes</span>
          <span className='commnet'><i className="fa fa-comment"></i>{data.comment} comments</span>
          <div className='caption'>
            {data.text}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Card;
