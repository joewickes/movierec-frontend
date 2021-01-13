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
    console.log('Updating post', postsArray);
    this.setState({posts: postsArray});
    return postsArray;
  }
  
  patchVote = (data) => {
    console.log('patching', data);
    const a = this.state.posts.map(post => {
      return post
    })
    console.log('a', a);
    VotesService.getVoteId(data)
      .then((res) => {
        console.log('result from getting id', res);
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
                console.log('Here has added originals', post)
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

            console.log('newposts', newPosts);

            this.setState({
              posts: newPosts,
            })
          })
      })
    ;
  }

  createVote = (data) => {
    console.log('creating', data);
    VotesService.addVote(JSON.stringify(data));
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