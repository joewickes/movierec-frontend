// Dependencies
import React from 'react';
import {withRouter} from 'react-router-dom';

// Components
import SearchFilter from './SearchFilter';
import PostList from './PostList';

// Styles
import './../styles/HomePage.css';
import Welcome from './Welcome';
import Context from '../context/Context';

class HomePage extends React.Component {
  
  state = {
    loggedIn: false,
    visited: false,
  }

  componentDidMount() {
    <Context.Consumer>
      {value => {
        this.setState({loggedIn: !!value.state.loggedIn});
      }}
    </Context.Consumer>
  }

  componentDidUpdate() {
    <Context.Consumer>
      {value => {
        this.setState({loggedIn: !!value.state.loggedIn});
      }}
    </Context.Consumer>
  }

  render() {

    return (
      <Context.Consumer>
        {value => {

          console.log('CDM', value.state.loggedIn);

          return (
            <>
              {value.state.loggedIn ? <Welcome /> : null}
              <SearchFilter />
              <PostList />
            </>
          );
        }}
      </Context.Consumer>
    );
  }
}

export default withRouter(HomePage);