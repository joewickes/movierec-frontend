// Dependencies
import React from 'react';

// Style
import './../styles/SearchFilter.css';

// Local Dependencies (Services)
import PostsService from './../services/posts-service';

// Context
import Context from '../context/Context';

class SearchFilter extends React.Component {

  state = {
    error: null,
  }

  render() {

    return (
      <Context.Consumer>
        {value => {

          const handleSearchSubmit = (e) => {
            e.preventDefault();

            value.updateSearch(e.target.searchBar.value);
            
            PostsService.searchPosts(value.state.searchValue)
              .then(response => {
                console.log('searchPost Result', response.json());
              })
              .catch(res => {
                this.setState({error: res.message});
              })
            ;
          }        

          return (
            <>
              <div className="search-genre-error-container">
                  <p style={{color: "red"}}>{this.state.error}</p>
              </div>
              <section className="search-filter">
                
                <form className="search-form" onSubmit={(e) => handleSearchSubmit(e)}>
                  <input name="searchBar" className="search-bar" type="search" placeholder="Movie Title" />
                </form>
                <div className="genres-container">
                  <select className="genres">
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
              </section>
      </>
          );
        }}
      
      </Context.Consumer>
    );
  }
}

export default SearchFilter;