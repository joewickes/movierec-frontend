// Local dependencies
import config from './../config';

const postsService = {
  getPosts: () => {
    return fetch(`${config.API_ENDPOINT}/posts`)
      .then(response => {
        return response.json();
      })
  }
}

export default postsService;