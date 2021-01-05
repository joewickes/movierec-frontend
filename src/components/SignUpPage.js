// Dependencies
import React from 'react';
import { withRouter } from 'react-router-dom';

// Components
import Header from './Header';

// Local
import usersService from './../services/users-service';

// Styles
import './../styles/SignUpPage.css';

class SignUpPage extends React.Component {

  state = {
    error: null,
    blah: 'Hey',
  }

  validateMatchingPwd = (pwd1, pwd2) => {
    
    if (pwd1 !== pwd2) {
      return 'Both passwords must be the same';
    } 
  }

  handleSignUpSubmit = (e) => {
    e.preventDefault();
    
    // Target data
    const {username, email, pwd1, pwd2} = e.target;

    const err = this.validateMatchingPwd(pwd1.value, pwd2.value);

    if (err) {
      return this.setState({
        error: err,
      })
    }

    // New Data Object
    const newUser = {
      username: window.btoa(username.value),
      email: window.btoa(email.value),
      password: window.btoa(pwd1.value),
    }

    usersService.postNewUser(newUser)
      .then(res => {
        if (res && res.error) {
          this.setState({error: res.error});
        } else {
          this.props.history.push('/forms/log-in');
        }
        
      })
      .catch(error => {
        this.setState({error: error.message});
      })

    // Return values to empty
    username.value = '';
    email.value = '';
    pwd1.value = '';
    pwd2.value = '';
  }

  render() {
    return(
      <>
        <Header />
        <main className="SignUpPage">
          <h2>Sign Up</h2>
          <p style={{color: "red"}}>{this.state.error}</p>
          <form className="log-in-form" onSubmit={(e) => this.handleSignUpSubmit(e)} >
            <div className="su-input-boxes">
              <input type="text" className="username" name="username" placeholder={"Username"} required />
              <input type="email" className="email" name="email" placeholder={"Email"} required />
              <input type="password" className="pwd1" name="pwd1" placeholder="Password" required />
              <input type="password" className="pwd2" name="pwd2" placeholder="Re-Enter Password" required />
            </div>
            <button className="sign-up-btn" type="submit">SIGN UP NOW</button>
          </form>
        </main>
      </>
    );
  }
}

export default withRouter(SignUpPage);