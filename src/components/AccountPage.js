// Dependencies
import React from 'react';
import { withRouter } from 'react-router-dom';
import Context from '../context/Context';

// Components
import Header from './Header';

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
              <h2>Account Page</h2>
              <button onClick={destroyCreds}>LOG OUT</button>
            </>
          );
        }}
      </Context.Consumer>
    );
  }
}

export default withRouter(AccountPage);