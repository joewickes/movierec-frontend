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
        {val => {

          const handleVote = (e, value, post_id, userid, v) => {
            e.preventDefault();

            console.log(v);

            let date = new Date().toISOString();

            let data = {};
            if (typeof v === 'number') {
              console.log('looks like this has been voted on before')
              data = {
                value,
                post_id,
                userid,
                date_created: date,
              };

              if (data.value === v) {
                console.log('same vote as before');
                data.value = 0;
              } else if (data.value !== v && v !== 0) {
                console.log('different vote, so not zero')
                data.value = -(v);
              }

              val.patchVote(data);
            } else {
              console.log('No vote so lets create one')
              data = {
                value,
                post_id,
                userid,
              };

              console.log('values of new vote', data)

              val.createVote(data);
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