// Local dependencies
import config from './../config';

const movieService = {
  getSingleMovie: (id) => {
    return fetch(`${config.API_ENDPOINT}/movies/${id}`)
      .then(response => {
        return response.json();
      })
  },
  // Fetch movies matching the title keywords
  getMatchingMovies: (search) => {
    return fetch(`${config.API_ENDPOINT}/movies?search=${search}`)
      .then(res => {
        return res.json();
      })
  },
  addMovie: (yn, user_id, newMovieObj) => {
    return fetch(`${config.API_ENDPOINT}/movies`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({yn, user_id, newMovieObj}),
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
            throw new Error('Can\'t create a movie right now');
          }
        })
      ;
  }
}

export default movieService;