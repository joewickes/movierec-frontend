// Dependencies
import React from 'react';
import { withRouter } from 'react-router-dom';

// Local
import usersService from './../services/users-service';

// Styles
import './../styles/SignUpPage.css';

class SignUpPage extends React.Component {

  state = {
    error: null,
    blah: 'Hey',
  }

  validatePasswords = (pwd1, pwd2) => { 
    const r = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&])[\S]+/;
    
    if (pwd1.startsWith(' ') || pwd2.startsWith(' ') || pwd1.endsWith(' ') || pwd2.endsWith(' ')) {
      return 'Passwords can\'t use spaces at the beginning or end';
    } else if (pwd1.length < 8 || pwd2.length < 8) {
      return 'Password must be more than 8 spaces';
    } else if (pwd1 !== pwd2) {
      return 'Both passwords must be the same';
    } else if (!r.test(pwd1)) {
      return 'Password must contain a lowercase, uppercase, number, and a special character (!@#$%^&)'
    } else {
      this.setState({error: null});
      return null;
    }
  }

  handleSignUpSubmit = (e) => {
    e.preventDefault();
    
    // Target data
    const {username, email, pwd1, pwd2} = e.target;

    const err = this.validatePasswords(pwd1.value, pwd2.value);

    if (err) {
      this.setState({
        error: err,
      });
    }

    // New Data Object
    const newUser = {
      username: window.btoa(username.value),
      email: window.btoa(email.value),
      password: window.btoa(pwd1.value),
    }

    usersService.postNewUser(newUser)
      .then(res => {
        console.log('RES from SignUpPage', res);
        if (res && res.error) {
          console.log('running res error', res)
          this.setState({error: res.error});
        } else {
          console.log('running res push', res)
          this.props.history.push('/forms/log-in');
        }
        
      })
      .catch(error => {
        this.setState({error: error.message});
        console.log('SignUpPageError', error);
      })

    // Return values to empty
    username.value = '';
    email.value = '';
    pwd1.value = '';
    pwd2.value = '';
  }

  render() {
    return(
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
    );
  }
}

export default withRouter(SignUpPage);