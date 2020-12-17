// Dependencies
import React from 'react';
import {withRouter} from 'react-router-dom';

// Components
import SearchFilter from './SearchFilter';
import PostList from './PostList';

// Styles
import './../styles/HomePage.css';

class HomePage extends React.Component {
  render() {

    

    return (
      <>
        <SearchFilter />
        <PostList />
      </>
    );
  }
}

export default withRouter(HomePage);