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
            const newPosts = this.state.posts.map(post => {
              if (post.id === data.post_id) {
                const parsedMyVote = parseInt(post.myvote);
                const parsedValue = parseInt(data.value);

                // If the original vote equals the current vote, votes returns to original



                const toggledVote =  parsedValue === 0 ? parseInt(-(parsedMyVote)) : parsedValue;
                const votes = !post.originalVotes ? (parseInt(post.votes) + toggledVote) : (parseInt(post.originalVotes) + toggledVote);
                console.log('parsedMyVote', parsedMyVote, 'parsedValue', parsedValue, 'toggledVote', toggledVote, 'votes', votes)
                const newPostObj = {
                  date_created: data.date_created,
                  id: post.id,
                  myvote: data.value,
                  title: post.title,
                  username: post.user,
                  votes: post.originalVotes && post.originalMyVote && (post.originalMyVote === data.value) ? post.originalVotes : votes,
                  originalVotes: post.originalVotes ? post.originalVotes : post.votes,
                  originalMyVote: post.originalMyVote ? post.originalMyVote : post.myvote,
                }
                return newPostObj;
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