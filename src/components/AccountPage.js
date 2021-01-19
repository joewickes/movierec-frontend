// Dependencies
import React from 'react';
import { withRouter } from 'react-router-dom';
import Context from '../context/Context';

// Components
import Header from './Header';

// Style
import './../styles/AccountPage.css';

class AccountPage extends React.Component {
  
  
  
  render() {

    return (
      <Context.Consumer>
        {value => {

        const destroyCreds = () => {
          window.sessionStorage.clear();
          value.grabLoggedInPosts();
          this.props.history.push('/');
        }

          return (
            <>
              <Header />
              <main className="AccountPage">
                <h2>Your Account</h2>
                <button className="movie-search-btn" onClick={destroyCreds}>LOG OUT</button>
              </main>
            </>
          );
        }}
      </Context.Consumer>
    );
  }
}

export default withRouter(AccountPage);