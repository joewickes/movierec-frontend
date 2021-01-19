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
    selectToColor: null,
    searchedInGeneral: false,
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
          const updateSelect = (e, value) => {
            e.preventDefault();


            this.setState({
              selected: value,
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
              searchedInGeneral: true,
            });

            movieService.getMatchingMovies(this.state.search)
              .then((res) => {

                if (res.length === 0) {
                  this.setState({
                    matches: [...res],
                    loading: false,
                    promptNum: 1,
                    searchedInGeneral: true,
                    error: 'Looks like we don\'t have this movie in our database yet.'
                  })
                } else if (res.length > 0) {
                  this.setState({
                    matches: [...res],
                    loading: false,
                    promptNum: 1,
                    searchedInGeneral: false
                  });
                }
                
              })
            ;
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

            if (this.state.selected) {
              this.setState({
                loading: true,
                error: null,
              });
            } else if (!this.state.selected) {
              this.setState({error: "Make sure to select something before you submit it!"})
              return;
            }
            
            postsService.getSinglePost(parseInt(this.state.selected))
              .then(matchedPost => {
                this.setState({
                  error: null,
                  loading: false,
                  promptNum: 4,
                })
              })
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
            movieService.addMovie(e.target['recommend-yn'].value, window.sessionStorage.getItem('user_id'), newMovieObj)
              .then(() => {
                this.props.history.push('/');
                contextValue.grabLoggedInPosts();
              })
            ;
          }

          // STYLE
          const updateColoringIfSelected = (e, value) => {
            e.preventDefault();
            this.setState({selectToColor: value})
            updateSelect(e, value);
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
              <form className="old-post-search-form" onSubmit={handleSelectSubmit}>
                {this.state.matches.map(match => {
                  return (
                    <div key={match.id} className="radio-btn-container">
                      <label htmlFor={match.id} id={match.id} name="old-post-search" className={this.state.selectToColor === match.id ? "selected-radio-btn radio-selects" : "radio-selects"} onClick={(e) => updateColoringIfSelected(e, match.id)} required>
                        <input className="radio-btn" type="radio" id={match.id} name="old-post-search" value={match.id}/>
                        {match.original_title}
                      </label>
                    </div>
                  );
                })}
                <div className="submit-and-new-movie-buttons-container">
                {this.state.matches.length > 0 ? <button type="submit" className="movie-search-btn">SUBMIT</button>: null}
                <div className="start-new-movie-button-container">
                  <div>
                    <p>Don't see the right movie?</p>
                  </div>
                  <div>
                    <button onClick={handleNewMovieStart} className="movie-search-btn">ADD A MOVIE</button>
                  </div>
                </div>
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
                  <div>
                    <label>
                      <input className="recommend-yn" type="radio" name="recommend-yn" value="Yes" defaultChecked />
                      Yes
                    </label>
                    <label>
                      <input className="recommend-yn" type="radio" name="recommend-yn" value="No" />
                      No
                    </label>
                  </div>
                  <div>
                    <button className="movie-search-btn submit-rec-btn" type="submit">SUBMIT</button>
                  </div>
                </form>
              </>
            );
          }

          // New movie form
          const makeNewMovieForm = () => {
            return (
              <form className="make-new-movie-form" onSubmit={handleNewMovieSubmit}>
                <div className="movie-form-top-inputs-container"></div>
                <div className="title-container">
                  <input className="make-new-movie-title search-bar title" type="text" placeholder="Title (e.g., A Movie Title)" onChange={updateTitle} required />
                </div>
                <div className="year-and-genres-container">
                  <input className="make-new-movie-year search-bar year" type="number" placeholder="Year (e.g., 2001)" onChange={updateYear} required /> {/*first movie came out in 1888} */}
                  <select className="make-new-movie-genre genres movie-genre-select" required onChange={updateGenre}>
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
                </div>
                <div className="make-new-post-form">
                  <p>Would you like to recommend this movie now?</p>
                  <div>
                    <label>
                      <input className="recommend-yn" type="radio" name="recommend-yn" value="Yes" defaultChecked />
                      Yes
                    </label>
                    <label>
                      <input className="recommend-yn" type="radio" name="recommend-yn" value="No" />
                      No
                    </label>
                  </div>
                </div>
                <button className="movie-search-btn" type="submit">SUBMIT</button>
              </form>);
          }

          const makeRedirectScreen = () => {
            return (
              <>
                <p>Looks like that movie has already been suggested!</p>
                <br />
                <br />
                <p>If you would like to upvote it, search for it on the home page and click the "+" button!</p>
                <br />
                <p><i>(You can get back to the home page by clicking the "MovieRec" logo on the top left)</i></p>
              </>
            );
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
            } else if (this.state.promptNum === 4) {
              return makeRedirectScreen();
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