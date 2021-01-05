// Dependencies
import React from 'react';
import { withRouter } from 'react-router-dom';

// Components
import Header from './Header';

class AccountPage extends React.Component {
  render() {
    return(
      <>
        <Header />
        <h2>Account Page</h2>
      </>
    );
  }
}

export default withRouter(AccountPage);