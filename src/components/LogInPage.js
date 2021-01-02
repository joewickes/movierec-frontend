// Dependencies
import React from 'react';
import { withRouter } from 'react-router-dom';
import bcrypt from 'bcryptjs';

// Local Dependencies
import UsersService from './../services/users-service';

// Style
import './../styles/LogInPage.css';

class LogInPage extends React.Component {

  state = {
    error: null,
  }
  
  handleLogInSubmit = (e) => {
    e.preventDefault();

    this.setState({error: null});

    const { username, pwd } = e.target;

    UsersService.postLogin({
      username: username.value,
      password: bcrypt.hashSync(pwd.value, 12),
    })
      .then(res => {
        username.value = '';
        pwd.value = '';
        // TokenService.saveAuthToken(res.authToken);
      })
      .catch(res => {
        this.setState({error: res.error})
      })
  }
  
  render() {
    return(
      <main className="LogInPage">
        <h2>Log In</h2>
        <form className="log-in-form" onSubmit={(e) => this.handleLogInSubmit(e)}>
          <input type="text" className="username" name="username" placeholder="Username" />
          <input type="password" className="pwd1" name="pwd" placeholder="Password" />
          <button className="log-in-btn" type="submit">LOG IN</button>
        </form>
      </main>
    );
  }
}

export default withRouter(LogInPage);