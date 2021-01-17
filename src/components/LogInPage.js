// Dependencies
import React from 'react';
import { withRouter } from 'react-router-dom';

// Components
import Header from './Header';

// Local Dependencies
import AuthService from './../services/auth-service';

// Style
import './../styles/LogInPage.css';

// Context
import Context from './../context/Context';

class LogInPage extends React.Component {

  state = {
    error: null,
  }
  
  render() {
    return(
      <Context.Consumer>
        {value => {

          const handleLogInSubmit = (e) => {
            e.preventDefault();

            this.setState({error: null})

            console.log(e.target.username.value, e.target.pwd.value);

            AuthService.authUser({
              username: window.btoa(e.target.username.value),
              password: window.btoa(e.target.pwd.value),
            })
              .then(parsedToken => {
                e.target.username.value = '';
                e.target.pwd.value = '';
                AuthService.saveAuthToken(parsedToken.createdToken);
                window.sessionStorage.setItem('user_id', parsedToken.userId)
                return 'completed';
              })
              .then(savedToken => {
                value.grabLoggedInPosts();
                this.props.history.push('/');
              })
              .catch(res => {
                this.setState({error: res.message})
              })
          }

          return (
            <>
              <Header />
              <main className="LogInPage">
                <h2>Log In</h2>
                <p style={{color: "red"}}>{this.state.error}</p>
                <form className="log-in-form" onSubmit={(e) => handleLogInSubmit(e)}>
                  <input type="text" className="username" name="username" placeholder="Username" required />
                  <input type="password" className="pwd1" name="pwd" placeholder="Password" required />
                  <button className="log-in-btn" type="submit">LOG IN</button>
                </form>
              </main>
            </>
          );
        }}
      </Context.Consumer>
      
    );
  }
}

export default withRouter(LogInPage);