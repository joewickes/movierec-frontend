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

            this.setState({error: null});

            const { username, pwd } = e.target;

            console.log(username, pwd);

            AuthService.authUser({
              username: window.btoa(username.value),
              password: window.btoa(pwd.value),
            })
              .then(token => {
                console.log('got back from auth service')
                return token.json();
              })
              .then(parsedToken => {
                username.value = '';
                pwd.value = '';
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