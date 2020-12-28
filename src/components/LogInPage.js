// Dependencies
import React from 'react';
import { withRouter } from 'react-router-dom';

// Style
import './../styles/LogInPage.css';

class LogInPage extends React.Component {
  render() {
    return(
      <main className="LogInPage">
        <h2>Log In</h2>
        <form className="log-in-form">
          <label for="username">Username</label>
          <input type="text" id="username" name="username" />
          <label for="password">Password</label>
          <input type="password" id="pwd" name="pwd" />
          <button type="submit">Submit</button>
        </form>
      </main>
    );
  }
}

export default withRouter(LogInPage);