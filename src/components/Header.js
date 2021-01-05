// Dependencies
import React from 'react';
import { NavLink } from 'react-router-dom';

// Styles
import './../styles/Header.css';

// Context
import './../context/Context';
import Context from './../context/Context';

class Header extends React.Component {
  
  render() {
    return (
      <Context.Consumer>
        {value => {
          return (
            <header>
              <section className="header-left">
                <NavLink to="/"><p>MovieRec</p></NavLink>
              </section>
              <section className="header-right">
                {!!window.sessionStorage.getItem('movierec-auth-token') ? <nav><NavLink to="/accounts/:account-id"><p>Account</p></NavLink></nav> : 
                <nav>
                  <NavLink to="/forms/log-in"><p>Log In</p></NavLink>
                  <NavLink to="/forms/sign-up"><p>Sign Up</p></NavLink>
                </nav>}
              </section>
            </header>
          )
        }}
      </Context.Consumer>
    );
  }
}

export default Header;