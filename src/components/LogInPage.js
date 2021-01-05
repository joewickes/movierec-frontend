// Dependencies
import React from 'react';
import { withRouter } from 'react-router-dom';

// Components
import Header from './Header';

// Local Dependencies
import AuthService from './../services/auth-service';

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

    AuthService.authUser({
      username: window.btoa(username.value),
      password: window.btoa(pwd.value),
    })
      .then(token => {
        username.value = '';
        pwd.value = '';
        AuthService.saveAuthToken(token);
        return 'completed';
      })
      .then(savedToken => {
        this.props.history.push('/');
      })
      .catch(res => {
        this.setState({error: res.message})
      })
  }
  
  render() {
    return(
      <>
        <Header />
        <main className="LogInPage">
          <h2>Log In</h2>
          <p style={{color: "red"}}>{this.state.error}</p>
          <form className="log-in-form" onSubmit={(e) => this.handleLogInSubmit(e)}>
            <input type="text" className="username" name="username" placeholder="Username" required />
            <input type="password" className="pwd1" name="pwd" placeholder="Password" required />
            <button className="log-in-btn" type="submit">LOG IN</button>
          </form>
        </main>
      </>
    );
  }
}

export default withRouter(LogInPage);