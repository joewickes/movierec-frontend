// Dependencies
import React from 'react';

// Styles
import './../styles/Post.css';

// Context
import Context from './../context/Context';

class Post extends React.Component {

  static defaultProps =  {
    
  }

  state = {
    title: this.props.title,
    owned: false,
  }

  render() {

    return (
      <Context.Consumer>
        {value => {

          const handleVote = (e, plusOrMinus, id, username) => {
            e.preventDefault()
          }

          return (
            <li className="Post">
              <section className="post-top">
                <h3>{this.props.title}</h3>
              </section>
              <section className="post-bottom">
                <p>{this.props.username}</p>
                <div className="uv-dv-buttons">
                  {!window.sessionStorage.getItem('movierec-auth-token') ? null 
                    : <button className="upvote-button" onClick={(e) => {
                      return handleVote(e, 1, this.props.id, parseInt(window.sessionStorage.getItem('user_id')))
                    }}>+</button>
                  }
                  
                  <div>{parseInt(this.props.votes)}</div>
                  {!window.sessionStorage.getItem('movierec-auth-token') ? null 
                    :  <button className="upvote-button" onClick={(e) => {
                      return handleVote(e, parseInt(-1), this.props.id, parseInt(window.sessionStorage.getItem('user_id')))
                    }}>-</button>  
                  }              
                </div>
              </section>
            </li>
          );
        }}
      </Context.Consumer>
    );
  }
}

export default Post;