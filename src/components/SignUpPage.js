// Dependencies
import React from 'react';
import { withRouter } from 'react-router-dom';

// Styles
import './../styles/SignUpPage.css';

class SignUpPage extends React.Component {
  render() {
    return(
      <main className="SignUpPage">
        <h2>Sign Up</h2>
        <form className="log-in-form">
          <label for="username">Username</label>
          <input type="text" id="username" name="username" />
          <label for="password">Password</label>
          <input type="password" id="pwd1" name="pwd1" />
          <label for="password">Re-Enter Password</label>
          <input type="password" id="pwd2" name="pwd2" />
          <button type="submit">Submit</button>
        </form>
      </main>
    );
  }
}

export default withRouter(SignUpPage);