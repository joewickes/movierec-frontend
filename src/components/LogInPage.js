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
          <input type="text" className="username" name="username" placeholder="Username" />
          <input type="password" className="pwd1" name="pwd" placeholder="Password" />
          <button className="log-in-btn" type="submit">LOG IN</button>
        </form>
      </main>
    );
  }
}

export default withRouter(LogInPage);