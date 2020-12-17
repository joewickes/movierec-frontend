// Dependencies
import React from 'react';
import { withRouter } from 'react-router-dom';

class NewRecPage extends React.Component {

  state = {
    promptNum: 0,
    title: '',
    description: '',
    matches: ['Blah blah', 'Another blah', 'And another'],
  }

  makeTitleSearchForm = () => {
    return (
      <form className="new-title-search-form">
        <label htmlFor="new-title-search">Movie Title</label>
        <input type="text"></input>
        <button type="submit">Search</button>
      </form>
    );
  }

  makeTitleSearchForm = () => {
    return (
      <form className="new-title-search-form">
        <label htmlFor="new-title-search">Movie Title</label>
        <input type="text"></input>
        <button type="submit">Search</button>
      </form>
    );
  }

  makePostSearchForm = () => {
    return (
      <form className="old-post-search-form">
        {this.state.matches.map(match => {
          return (
            <label>
              <input type="radio" name={match} value={match}>{match}</input>
            </label>
          );
        })}
        <button type="submit">Submit</button>
      </form>
    );
  }
  
  render() {



    return (
      <main>
        <h2>Add a Recommendation</h2>
        {this.state.promptNum === 0 ? this.makeTitleSearchForm() : this.makePostSearchForm()}
      </main>
    );
  }
}

export default withRouter(NewRecPage);