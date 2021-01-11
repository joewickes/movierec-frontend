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
    owned: false,
  }

  render() {

    return (
      <Context.Consumer>
        {value => {

          const handleVote = (e, num, post_id, user_id, v) => {
            e.preventDefault();

            console.log('HANDLING IT');
            console.log('vote', v);

            let data = {};
            if (typeof v === 'number') {
              data = {
                'value': num,
                post_id,
                user_id,
              };

              value.patchVote(data);
            } else {
              data = {
                'value': num,
                post_id,
                user_id,
              };

              value.createVote(data);
            }
            
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
                      return handleVote(e, 1, this.props.id, parseInt(window.sessionStorage.getItem('user_id')), this.props.myVote)
                    }} style={
                      parseInt(this.props.myVote) === 1 ? {borderColor: 'green', color: 'green'} : null
                    }>+</button>
                  }
                  {console.log(this.props.myVote)}
                  <div style={parseInt(this.props.myVote) === 1 ? {color: "green"} : parseInt(this.props.myVote) === parseInt(-1) ? {color: "red"} : null}>{parseInt(this.props.votes)}</div>
                  {!window.sessionStorage.getItem('movierec-auth-token') ? null 
                    :  <button className="upvote-button" onClick={(e) => {
                      return handleVote(e, -1, this.props.id, parseInt(window.sessionStorage.getItem('user_id')), this.props.myVote)
                    }} style={
                      parseInt(this.props.myVote) === parseInt(-1) ? {borderColor: 'red', color: 'red'} : null
                    }>-</button>  
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