// Dependencies
import React from 'react';
import { NavLink } from 'react-router-dom';

// Components
import Post from './Post';

// Context
import Context from './../context/Context';

//Styles
import './../styles/PostList.css';

class PostList extends React.Component {

  state = {
    loggedIn: null,
  }

  render() {
    return (

      <Context.Consumer>
        {value => {
          return (
            <section className="results">
              {!!window.sessionStorage.getItem('movierec-auth-token') === false ? null : <NavLink to="/forms/add-rec"><button className="new-button">NEW REC</button></NavLink>}
              <ul className="PostList">
                {value.state.posts.map(post => <Post key={post.id} id={post.id} title={post.title} username={post.username} votes={post.votes} />)}
              </ul>
            </section>);
        }}
      
      </Context.Consumer>
    );
  }
}

export default PostList;