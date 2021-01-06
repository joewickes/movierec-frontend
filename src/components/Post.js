import React from 'react';

import './../styles/Post.css';

class Post extends React.Component {

  static defaultProps =  {
    
  }

  state = {
    title: this.props.title,
    owned: false,
  }

  render() {

    return (
      <li className="Post">
        <section className="post-top">
          <h3>{this.props.title}</h3>
        </section>
        <section className="post-bottom">
          <p>{this.props.username}</p>
          <div className="uv-dv-buttons">
            <button className="upvote-button">+</button>
            <div>{parseInt(this.props.votes)}</div>
            <button className="downvote-button">x</button>
          </div>
        </section>
      </li>
    );
  }
}

export default Post;