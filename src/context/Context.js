// Dependencies
import React from 'react';

// Local Dependencies (Services)
import PostsService from './../services/posts-service';
import VotesService from './../services/votes-service';

// Context
const Context = React.createContext();

export class ContextProvider extends React.Component {
  
  state = {
    loggedIn: window.sessionStorage.getItem('movierec-auth-token'),
    posts: [],
    searchValue: null,
  }

  componentDidMount() {
    PostsService.grabPosts('homePageGet', window.sessionStorage.getItem('user_id'), 0)
      .then(returnedPosts => {
        this.setState({posts: returnedPosts})
    })
  }

  grabLoggedInPosts = () => {
    PostsService.grabPosts('homePageGet', window.sessionStorage.getItem('user_id'), 0)
      .then(returnedPosts => {
        console.log('returned posts');
        this.setState({posts: returnedPosts})
    })
  }

  updatePosts = (postsArray) => {
    this.setState({posts: postsArray});
    return postsArray;
  }

  patchVote = (data) => {
    console.log('patching', data);
    // VotesService.updateVote('update', JSON.stringify(data));
  }

  createVote = (data) => {
    console.log('creating', data);
    // VotesService.addVote('add', JSON.stringify(data));
  }

  clearResults = () => {
    this.setState({posts: []});
  }
  
  render() {
    return (
      <Context.Provider value={{
        state: this.state,
        updatePosts: this.updatePosts,
        clearResults: this.clearResults,
        grabLoggedInPosts: this.grabLoggedInPosts,
        patchVote: this.patchVote,
        createVote: this.createVote,
      }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;