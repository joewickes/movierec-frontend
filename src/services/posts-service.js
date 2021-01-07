// Local dependencies
import config from './../config';

const postsService = {
  grabPosts: (where, userId, offset) => {
    console.log('Getting Most Recent Posts');
    const postsObj = {
      where,
      userId,
      offset,
    }

    console.log(postsObj)
;
    return fetch(`${config.API_ENDPOINT}/posts`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(postsObj),
      })
        .then(res => {
          if (!res.ok) {
            return res.json()
              .then(e => Promise.reject(e));
          } else {
            return res.json();
          }
        })
        .catch(error => {
          if (error.error) {
            throw new Error(error.error);
          } else {
            throw new Error('Can\'t grab any posts');
          }
          // console.log('error', error);
        })
      ;
  },
  searchPosts: (searchTitle) => {

    const searchObj = {
      where: 'homePageSearch',
      title: searchTitle,
    }

    return fetch(`${config.API_ENDPOINT}/posts`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(searchObj),
    })
      .then(res => {
        if (!res.ok) {
          return res.json()
            .then(e => Promise.reject(e));
        } else {
          return res.json();
        }
      })
      .catch(error => {
        if (error.error) {
          throw new Error(error.error);
        } else {
          throw new Error('Can\'t find that title right now');
        }
        // console.log('error', error);
      })
    ;
  },
  filterByGenre: (genre) => {
    const genreObj = {
      where: 'homePageFilter',
      genre: genre,
    }

    return fetch(`${config.API_ENDPOINT}/posts`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(genreObj),
    })
      .then(res => {
        if (!res.ok) {
          return res.json()
            .then(e => Promise.reject(e));
        } else {
          return res.json();
        }
      })
      .catch(error => {
        if (error.error) {
          throw new Error(error.error);
        } else {
          throw new Error('Can\'t look up that genre right now');
        }
        // console.log('error', error);
      })
    ;
  },
  createVote: (postId, voteValue, UserId) => {

  }
}

export default postsService;




// Post has positive 4 votes
// I upvote the post (Adding one vote)
// I submit that vote to the backend
// If it throws a 201 created or 2** (updated/patched)
// Then I update state (Post has 5 votes)