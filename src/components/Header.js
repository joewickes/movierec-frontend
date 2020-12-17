// Dependencies
import React from 'react';
import { NavLink } from 'react-router-dom';

// Styles
import './../styles/Header.css';

class Header extends React.Component {
  
  state = {
    loggedIn: false,
  }
  
  render() {
    return (
      <header>
        <section className="header-left">
          <NavLink to="/"><p>MovieRec</p></NavLink>
        </section>
        <section className="header-right">
          {this.state.loggedIn ?<nav><NavLink to="/accounts/:account-id"><p>Account</p></NavLink></nav> : 
          <nav>
            <NavLink to="/forms/log-in"><p>Log In</p></NavLink>
            <NavLink to="/forms/sign-up"><p>Sign Up</p></NavLink>
          </nav>}
        </section>
      </header>
    );
  }
}

export default Header;