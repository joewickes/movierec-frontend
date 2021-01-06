// Local dependencies
import config from './../config';

const postsService = {
  getPosts: () => {
    return fetch(`${config.API_ENDPOINT}/posts`)
      .then(response => {
        return response.json();
      })
  },
  searchPosts: (searchTitle) => {

    const searchObj = {
      where: 'homepage',
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
          console.log('THIS is the res', res.json())
          return res.json();
        }
      })
      .catch(error => {
        throw new Error('Can\'t find that title right now');
      })
    ;
  }
}

export default postsService;