// Dependencies
import React from 'react';
import { NavLink } from 'react-router-dom';

// Components
import Post from './Post';

//Styles
import './../styles/PostList.css';

class PostList extends React.Component {

  state = {
    nums: ['Post 1', 'Post 2', 'Post 3', 'Post 4', 'Post 5', 'Post 6', 'Post 7', 'Post 8', 'Post 9', 'Post 10'],
    loggedIn: null,
  }

  render() {
    return (
      <section className="results">
        {!!window.sessionStorage.getItem('movierec-auth-token') === false ? null : <NavLink to="/forms/add-rec"><button className="new-button">NEW REC</button></NavLink>}
        <ul className="PostList">
          {this.state.nums.map(num => <Post key={num} title={num} />)}
        </ul>
      </section>
    );
  }
}

export default PostList;