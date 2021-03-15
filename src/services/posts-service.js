// Local dependencies
import config from './../config';

const postsService = {
  grabPosts: (where, userId, offset) => {
    const postsObj = {
      where,
      userId: parseInt(userId),
      offset,
    }
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
          console.log(error.error.message)
          if (error) {
            throw new Error(error.error.message);
          } else {
            throw new Error('Can\'t grab any posts');
          }
        })
      ;
  },
  searchPosts: (searchTitle) => {

    const searchObj = {
      where: 'homePageSearch',
      title: searchTitle,
      userId: parseInt(window.sessionStorage.getItem('user_id'))
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
      })
    ;
  },
  filterByGenre: (genre) => {
    const genreObj = {
      where: 'homePageFilter',
      genre: genre,
      userId: parseInt(window.sessionStorage.getItem('user_id'))
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
      })
    ;
  },
  getSinglePost: (id) => {
    return fetch(`${config.API_ENDPOINT}/posts/${id}`)
      .then(res => {
        if (!res.ok) {
          return res.json()
            .then(e => Promise.reject(e));
        } else {
          return res.json();
        }
      })
      .catch(error => {
        if (error.message) {
          throw new Error(error.message);
        } else {
          throw new Error('Can\'t look up that info right now');
        }
      })
    ;
  },
  insertPost: (newPostObj) => {
    return fetch(`${config.API_ENDPOINT}/posts`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({where: 'addNewPost', newPostObj}),
    })
      .then(res => {
        if (!res.ok) {
          return res.json()
            .then(e => Promise.reject(e));
        } else {
          return;
        }
      })
      .catch(error => {
        if (error.error) {
          throw new Error(error.error);
        } else {
          throw new Error('Can\'t post any rec\'s right now');
        }
      })
    ;
  }
}

export default postsService;




// Post has positive 4 votes
// I upvote the post (Adding one vote)
// I submit that vote to the backend
// If it throws a 201 created or 2** (updated/patched)
// Then I update state (Post has 5 votes)