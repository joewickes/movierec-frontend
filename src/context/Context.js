// Dependencies
import React from 'react';

// Local Dependencies (Services)
import PostsService from './../services/posts-service';

// Context
const Context = React.createContext();

export class ContextProvider extends React.Component {
  
  state = {
    loggedIn: window.sessionStorage.getItem('movierec-auth-token'),
    posts: [],
    searchValue: null,
  }

  componentDidMount() {
    console.log('userID', window.sessionStorage.getItem('user_id'));
    PostsService.grabPosts('homePageGet', window.sessionStorage.getItem('user_id'), 0)
      .then(returnedPosts => {
        this.setState({posts: returnedPosts})
    })
  }

  grabLoggedInPosts = () => {
    PostsService.grabPosts('homePageGet', window.sessionStorage.getItem('user_id'), 0)
      .then(returnedPosts => {
        this.setState({posts: returnedPosts})
    })
  }

  updatePosts = (postsArray) => {
    console.log('Updating post', postsArray);
    this.setState({posts: postsArray});
    return postsArray;
  }

  clearResults = () => {
    console.log('clearing results');
    this.setState({posts: []});
  }
  
  render() {
    return (
      <Context.Provider value={{
        state: this.state,
        updatePosts: this.updatePosts,
        clearResults: this.clearResults,
        grabLoggedInPosts: this.grabLoggedInPosts,
      }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;