// Dependencies
import React from 'react';
import {withRouter} from 'react-router-dom';

// Components
import SearchFilter from './SearchFilter';
import PostList from './PostList';

// Styles
import './../styles/HomePage.css';
import Welcome from './Welcome';

class HomePage extends React.Component {
  
  state = {
    visited: false
  }

  componentDidMount() {

  }

  render() {

    return (
      <>
        {this.state.visited ? null : <Welcome />}
        <SearchFilter />
        <PostList />
      </>
    );
  }
}

export default withRouter(HomePage);