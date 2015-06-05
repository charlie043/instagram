var React     = require('react');

var Card = React.createClass({

  propTypes: {
    data: React.PropTypes.object.isRequired
  },

  render: function() {
    var {
      type,
      url,
      id,
      link,
      profile,
      like,
      comment,
      text
    } = this.props.data;

    var content = (type === 'video') ?
      (<video src={url} controls />) :
      (<img src={url} />) ;

    return (
      <div className='card col'>
        <img className='profile' src={profile} />
        <a href={link} target='_blank'>
          {content}
        </a>
        <div className='like-comment'>
          <span className='like'><i className="fa fa-heart"></i>{like} likes</span>
          <span className='commnet'><i className="fa fa-comment"></i>{comment} comments</span>
          <div className='caption'>
            {text}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Card;
