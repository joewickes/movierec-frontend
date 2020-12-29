// Dependencies
import React from 'react';
import { withRouter } from 'react-router-dom';

import './../styles/NewRecPage.css';

class NewRecPage extends React.Component {

  state = {
    loading: false,
    promptNum: 0,
    search: '',
    matches: [],
    selected: '',
    title: '',
    genre: '',
    yn: 'yn',
    user: 'user1',
  }

  // SEARCH FOR EXISTING MOVIES FORM

  // Update search in state as it's typed
  updateSearch = (e) => {
    this.setState({
      search: e.target.value,
    })
  }


  // SELECT EXISTING MOVIE OR ADD ONE TO RECOMMEND

  // Update radio button in state selection as it's selected
  updateSelect = (e) => {
    this.setState({
      selected: e.target.value,
    })
  }


  // MAKE NEW MOVIE FORM

  // Update title in state as it's typed
  updateTitle = (e) => {
    this.setState({
      title: e.target.value,
    });
  }

  // Update year in state as it's typed
  updateYear = (e) => {
    this.setState({
      year: e.target.value,
    })
  }

  // Update genre in state as it's selected
  updateGenre = (e) => {
    this.setState({
      genre: e.target.value,
    })
  }

  // Fetch movies matching the title keywords
  getMatchingMovies = () => {
    return fetch(`http://localhost:8000/api/movies?search=${this.state.search}`)
      .then(res => {
        return res.json();
      })
  }

  // Fetch post matching movie (if 404, create new post)

  // Handle submitting the title form
  handleTitleSubmit = (e) => {
    e.preventDefault();

    this.setState({loading: true});

    this.getMatchingMovies()
      .then((res) => {
        this.setState({
          matches: [...res],
          loading: false,
          promptNum: 1,
        })
      })
  }

  // Handle a new movie input
  handleNewMovieStart = (e) => {
    e.preventDefault();

    this.setState({promptNum: 2})
  }

  // Handle submitting the movie radio button form
  handleSelectSubmit = (e) => {
    e.preventDefault();

    this.setState({loading: true});
    console.log('Submit with movie already in the database');
  }

  // Handle submitting a new movie form
  handleNewMovieSubmit = (e) => {
    e.preventDefault();

    this.setState({loading: true});
    console.log('Submit new movie for people to enjoy!');
  }

  // FORMS
  // Starting Form (Search by movie titles)
  makeTitleSearchForm = () => {
    return (
      <form className="new-title-search-form" onSubmit={this.handleTitleSubmit}>
        <input className="new-title-search" onChange={this.updateSearch} type="text" placeholder="Movie Title" />
        <button type="submit" className="movie-search-btn">SEARCH</button>
      </form>
    )
  }

  // Second Form (Select existing movie titles to ref against movies already recommended)
  makePostSearchForm = () => {
    return (
      <form className="old-post-search-form" onChange={this.updateSelect} onSubmit={this.handleSelectSubmit}>
        {this.state.matches.map(match => {
          return (
            <div key={match.id} className="radio-btn-container">
              <label htmlFor={match.id} className="radio-selects">
              <input  type="radio" id={match.id} name="old-post-search" value={match.id} />
              {match.original_title}
              </label>
            </div>
          );
        })}
        <button type="submit" className="movie-search-btn">SUBMIT</button>
        <div>
          <p>Don't see the right movie?</p>
          <button onClick={this.handleNewMovieStart} className="movie-search-btn">ADD A MOVIE</button>
        </div>
      </form>
    ); 
  }

  // New movie form
  makeNewMovieForm = () => {
    return (
      <form className="make-new-movie-form" onSubmit={this.handleNewMovieSubmit}>
        <input className="make-new-movie-title" type="text" placeholder="e.g., A Movie Title" onChange={this.updateTitle} required />
        <input className="make-new-movie-year" type="number" placeholder="e.g., 2001" onChange={this.updateYear} required /> {/*first movie came out in 1888} */}
        <select className="make-new-movie-genre" required onChange={this.updateGenre}>
          <option value="">Genres</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Horror">Horror</option>
          <option value="Mystery">Mystery</option>
          <option value="Romance">Romance</option>
          <option value="Thriller">Thriller</option>
          <option value="Western">Western</option>
        </select>
        <div>
          <p>Would you like to recommend this movie now?</p>
          <label>
            <input className="recommend-yn" type="radio" name="recommend-yn" value="Yes" defaultChecked />
            Yes
          </label>
          <label>
            <input className="recommend-yn" type="radio" name="recommend-yn" value="No" />
            No
          </label>
        </div>
        <button className="movie-search-btn" type="submit">SUBMIT</button>
      </form>);
  }

  // Handle loading
  makeLoadingScreen = () => {
    return (
      <p>Loading...</p>
    );
  }

  chooseForm = () => {
    if (this.state.loading) {
      return this.makeLoadingScreen();
    } else if (this.state.promptNum === 0) {
      return this.makeTitleSearchForm();
    } else if (this.state.promptNum === 1) {
      return this.makePostSearchForm();
    } else if (this.state.promptNum === 2) {
      return this.makeNewMovieForm();
    }
  }
  
  render() {
    return (
      <main className="NewRecPage">
        <h2>Add a Recommendation</h2>
        {this.chooseForm()}
      </main>
    );
  }
}

export default withRouter(NewRecPage);