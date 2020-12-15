import React from 'react';
import './../styles/Header.css';

class Header extends React.Component {
  
  state = {
    loggedIn: true,
  }
  
  render() {
    return (
      <header>
        <section className="header-left">
          <p>MovieRec</p>
        </section>
        <section className="header-right">
          {this.state.loggedIn ? <a className="account">Account</a> : <nav>
            <a href="#">Log In</a>
            <a href="#">Sign Up</a>
          </nav>}
        </section>
      </header>
    );
  }
}

export default Header;