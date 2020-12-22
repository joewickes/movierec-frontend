// Dependencies
import React from 'react';

// Style
import './../styles/SearchFilter.css';

class SearchFilter extends React.Component {
  render() {

    return (
      <section className="search-filter">
        <form className="search-form">
          <input name="search-bar" className="search-bar" type="search" placeholder="Movie Title" />
        </form>
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
      </section>
    );
  }
}

export default SearchFilter;