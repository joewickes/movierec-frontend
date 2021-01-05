// Dependencies
import React from 'react';
import { NavLink } from 'react-router-dom';

// Components
import Post from './Post';

// Services
import PostsService from './../services/posts-service';

//Styles
import './../styles/PostList.css';

class PostList extends React.Component {

  state = {
    posts: [],
    loggedIn: null,
  }

  componentDidMount() {
    PostsService.getPosts()
      .then(returnedPosts => {
        this.setState({posts: returnedPosts})
    })
  }

  render() {
    return (
      <section className="results">
        {!!window.sessionStorage.getItem('movierec-auth-token') === false ? null : <NavLink to="/forms/add-rec"><button className="new-button">NEW REC</button></NavLink>}
        <ul className="PostList">
          {this.state.posts.map(post => <Post key={post.id} title={post.title} />)}
        </ul>
      </section>
    );
  }
}

export default PostList;