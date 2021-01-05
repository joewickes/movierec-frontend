// Dependencies
import React from 'react';

// Styles
import './../styles/Welcome.css';

// Context

export default class Welcome extends React.Component {
  render() {

    return (
      <section className="welcome">
        <div className="welcome-text">
          <p>Welcome to MovieRec, a place for you to recommend and vote on movies!</p>
          <br></br>
          <div>
            <p>Here's how you can use it:</p>
            <ul>
              <li>Sign up for an account - or log in to an existing one - to be able to recommend or vote on a movie!</li>
              <li>Search already recommended movies by keyword in the search bar to match</li>
              <li>Filter already recommended movies by genre to see the top rated in that genre</li>
              <li>Recommend your own movies by clicking the "New" button and following the prompts!</li>
            </ul>
          </div>
        </div>
      </section>
    );
  }
}