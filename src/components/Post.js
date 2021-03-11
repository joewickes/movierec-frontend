// Dependencies
import React from 'react';
import { AiFillCaretDown } from "react-icons/ai";
import { AiFillCaretUp } from "react-icons/ai";

// Styles
import './../styles/Post.css';

// Context
import Context from './../context/Context';

class Post extends React.Component {

static defaultProps = {
  id: 0,
  title: null,
  username: null,
  votes: 0,
  myVote: null,
}

  render() {

    return (
      <Context.Consumer>
        {val => {

          const handleVote = (e, value, post_id, userid, v) => {
            e.preventDefault();

            

            let date = new Date().toISOString();

            let data = {};
            if (typeof v === 'number') {
              data = {
                value,
                post_id,
                userid,
                date_created: date,
              };

              if (data.value === v) {
                data.value = 0;
              } else if (data.value !== v && v !== 0) {
                data.value = -(v);
              }

              val.patchVote(data);
            } else {
              data = {
                value,
                post_id,
                userid,
              };

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
                    : <AiFillCaretUp className="upvote-button" onClick={(e) => {
                      return handleVote(e, 1, this.props.id, parseInt(window.sessionStorage.getItem('user_id')), this.props.myVote)
                    }} style={
                      parseInt(this.props.myVote) === 1 ? {fill: 'green'} : null
                    } />
                  }
                  <div style={parseInt(this.props.myVote) === 1 ? {color: "green"} : parseInt(this.props.myVote) === parseInt(-1) ? {color: "red"} : {color: "#fff203da"}}>{parseInt(this.props.votes)}</div>
                  {!window.sessionStorage.getItem('movierec-auth-token') ? null 
                    :  <AiFillCaretDown className="upvote-button" onClick={(e) => {
                      return handleVote(e, -1, this.props.id, parseInt(window.sessionStorage.getItem('user_id')), this.props.myVote)
                    }} style={
                      parseInt(this.props.myVote) === parseInt(-1) ? {fill: 'red'} : null
                    } />
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