// Dependencies
import React from 'react';
import { withRouter } from 'react-router-dom';

// Components
import Header from './Header';

//Context
import Context from './../context/Context';

// Styles
import './../styles/NewRecPage.css';

// Service Object
import movieService from './../services/movie-service';
import postsService from './../services/posts-service';

class NewRecPage extends React.Component {

  state = {
    loading: false,
    promptNum: 0,
    search: '',
    matches: [],
    selected: null,
    year: null,
    title: '',
    genre: '',
    yn: 'yn',
    user: 'user1',
    error: null,
    singleMovieInfo: null,
  }

  
  render() {
    return (
      <Context.Consumer>
        {contextValue => {

          // Update search in state as it's typed
          const updateSearch = (e) => {
            this.setState({
              search: e.target.value,
            })
          }


          // SELECT EXISTING MOVIE OR ADD ONE TO RECOMMEND

          // Update radio button in state selection as it's selected
          const updateSelect = (e) => {
            this.setState({
              selected: e.target.value,
            })
          }


          // MAKE NEW MOVIE FORM

          // Update title in state as it's typed
          const updateTitle = (e) => {
            this.setState({
              title: e.target.value,
            });
          }

          // Update year in state as it's typed
          const updateYear = (e) => {
            this.setState({
              year: e.target.value,
            })
          }

          // Update genre in state as it's selected
          const updateGenre = (e) => {
            this.setState({
              genre: e.target.value,
            })
          }


          // Handle submitting the title form
          const handleTitleSubmit = (e) => {
            e.preventDefault();

            this.setState({
              loading: true,
              error: null,
            });

            movieService.getMatchingMovies(this.state.search)
              .then((res) => {
                this.setState({
                  matches: [...res],
                  loading: false,
                  promptNum: 1,
                })
              })
          }

          // Handle submission of new post
          const handleNewPostSubmit = (e) => {
            e.preventDefault();

            const val = e.target['recommend-yn'].value;
            if (val === 'Yes') {

              const newPostData =  {
                title: this.state.singleMovieInfo.original_title,
                movie_id: this.state.singleMovieInfo.id,
                user_id: window.sessionStorage.getItem('user_id'),
              }

              this.setState({loading: true});
              
              postsService.insertPost(newPostData)
                .then(() => {
                  console.log('made it back from inserting the post');
                  this.props.history.push('/');
                  contextValue.grabLoggedInPosts();
                })

            } else {
              this.props.history.push('/');
            }
          }

          // Handle a new movie input
          const handleNewMovieStart = (e) => {
            e.preventDefault();

            this.setState({
              promptNum: 3,
              error: null
            })
          }

          // Handle submitting the movie radio button form
          const handleSelectSubmit = (e) => {
            e.preventDefault();

            this.setState({
              loading: true,
              error: null,
            });
            
            postsService.getSinglePost(parseInt(this.state.selected))
              .then(matchedPost => console.log('matchedPost', matchedPost))
              .catch(error => {
                if (error.message === 'No matching posts') {
                  movieService.getSingleMovie(this.state.selected)
                    .then(response => {
                      this.setState({
                        loading: false,
                        singleMovieInfo: response,
                        promptNum: 2,
                      })
                    })  
                  
                } else {
                  this.setState({error: error.message})
                }
                
              })
          }

          // Handle submitting a new movie form
          const handleNewMovieSubmit = (e) => {
            e.preventDefault();

            this.setState({loading: true});
            
            const newMovieObj = {
              original_title: this.state.title,
              year: this.state.year,
              genre: this.state.genre,
            }
            console.log(window.sessionStorage.getItem('user_id'));
            movieService.addMovie(e.target['recommend-yn'].value, window.sessionStorage.getItem('user_id'), newMovieObj)
              .then(() => {
                this.props.history.push('/');
                contextValue.grabLoggedInPosts();
              })
            ;
          }

          // FORMS
          // Starting Form (Search by movie titles)
          const makeTitleSearchForm = () => {
            return (
              <form className="new-title-search-form" onSubmit={handleTitleSubmit}>
                <input className="new-title-search" onChange={updateSearch} type="text" placeholder="Movie Title" />
                <button type="submit" className="movie-search-btn">SEARCH</button>
              </form>
            )
          }

          // Second Form (Select existing movie titles to ref against movies already recommended)
          const makePostSearchForm = () => {
            return (
              <form className="old-post-search-form" onChange={updateSelect} onSubmit={handleSelectSubmit}>
                {this.state.matches.map(match => {
                  return (
                    <div key={match.id} className="radio-btn-container">
                      <label htmlFor={match.id} className="radio-selects">
                      <input  type="radio" id={match.id} name="old-post-search" value={match.id} required/>
                      {match.original_title}
                      </label>
                    </div>
                  );
                })}
                {this.state.matches.length > 0 ? <button type="submit" className="movie-search-btn">SUBMIT</button>: null}
                <div>
                  <p>Don't see the right movie?</p>
                  <button onClick={handleNewMovieStart} className="movie-search-btn">ADD A MOVIE</button>
                </div>
              </form>
            ); 
          }

          // New post form
          const makeNewPostForm = () => {

            const movieInfo = this.state.singleMovieInfo;
            return (    
              <>
                {<h3 style={{color: '#fff203da'}}>{movieInfo.original_title} ({movieInfo.year})</h3>}
                <form className="make-new-post-form" onSubmit={(e) => handleNewPostSubmit(e)}>
                  <p>Would you like to recommend this movie now?</p>
                        <label>
                          <input className="recommend-yn" type="radio" name="recommend-yn" value="Yes" defaultChecked />
                          Yes
                        </label>
                        <label>
                          <input className="recommend-yn" type="radio" name="recommend-yn" value="No" />
                          No
                        </label>
                        <button className="movie-search-btn" type="submit">SUBMIT</button>
                </form>
              </>
            );
          }

          // New movie form
          const makeNewMovieForm = () => {
            return (
              <form className="make-new-movie-form" onSubmit={handleNewMovieSubmit}>
                <input className="make-new-movie-title" type="text" placeholder="e.g., A Movie Title" onChange={updateTitle} required />
                <input className="make-new-movie-year" type="number" placeholder="e.g., 2001" onChange={updateYear} required /> {/*first movie came out in 1888} */}
                <select className="make-new-movie-genre" required onChange={updateGenre}>
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
          const makeLoadingScreen = () => {
            return (
              <p>Loading...</p>
            );
          }

          const chooseForm = () => {
            if (this.state.loading) {
              return makeLoadingScreen();
            } else if (this.state.promptNum === 0) {
              return makeTitleSearchForm();
            } else if (this.state.promptNum === 1) {
              return makePostSearchForm();
            } else if (this.state.promptNum === 2) {
              return makeNewPostForm();
            } else if (this.state.promptNum === 3) {
              return makeNewMovieForm();
            }
          }
                
          return (
            <>
              <Header></Header>
              <main className="NewRecPage">
                <h2>Add a Recommendation</h2>
                <div className="search-genre-error-container">
                  <p style={{color: "red"}}>{this.state.error}</p>
                </div>
                {chooseForm()}
              </main>
            </>
          );
        }}
      </Context.Consumer>
    );
  }
}

export default withRouter(NewRecPage);