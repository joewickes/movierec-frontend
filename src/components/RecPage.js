// Dependencies
import React from 'react';
import { withRouter } from 'react-router-dom';

// Components 
import Header from './Header';

class RecPage extends React.Component {
  render() {
    return(
      <>
        <Header />
        <h2>Rec Page</h2>
      </>
    );
  }
}

export default withRouter(RecPage);