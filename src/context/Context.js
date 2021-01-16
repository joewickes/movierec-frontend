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
    username: null,
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
        this.setState({posts: returnedPosts})
    })
  }

  updatePosts = (postsArray) => {
    this.setState({posts: postsArray});
    return postsArray;
  }
  
  patchVote = (data) => {
    VotesService.getVoteId(data)
      .then((res) => {
        VotesService.updateVote(res, data)
          .then(() => {
            const addedOriginals = this.state.posts.map(post => {
              if (post.id === data.post_id && !post.originalVotes && !post.originalMyVote) {
                const objWithOriginals = {
                    date_created: post.date_created,
                    id: post.id,
                    myvote: parseInt(post.myvote),
                    title: post.title,
                    username: post.username,
                    votes: parseInt(post.votes),
                    originalVotesWithoutThisUser: parseInt(post.votes - post.myvote),
                    originalVotes: parseInt(post.myvote),
                  }
                return objWithOriginals;
              } else return post;
            })

            const newPosts = addedOriginals.map(post => {
              if (post.id === data.post_id) {
                const votesTotal = parseInt(post.originalVotesWithoutThisUser) + parseInt(data.value);

                return {
                  date_created: post.date_created,
                  id: post.id,
                  myvote: data.value,
                  title: post.title,
                  username: post.username,
                  votes: votesTotal,
                  originalMyVote: post.originalMyVote,
                  originalVotesWithoutThisUser: post.originalVotesWithoutThisUser,
                }
              } else return post;
            })

            this.setState({
              posts: newPosts,
            })
          })
      })
    ;
  }

  createVote = (data) => {
    VotesService.addVote(data)
      .then('Added the thing');
  }

  clearResults = () => {
    this.setState({posts: []});
  }

  setUsername = (username) => {
    this.setState({username})
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
        setUsername: this.setUsername,
      }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;