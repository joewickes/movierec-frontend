const movieService = {
  getSingleMovie: (id) => {
    return fetch(`http://localhost:8000/api/movies/${id}`)
      .then(response => {
        return response.json();
      })
  },
  // Fetch movies matching the title keywords
  getMatchingMovies: (search) => {
    return fetch(`http://localhost:8000/api/movies?search=${search}`)
      .then(res => {
        return res.json();
      })
  },
}

export default movieService;