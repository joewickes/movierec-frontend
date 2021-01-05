// Dependencies
import React from 'react';
import {withRouter} from 'react-router-dom';

// Components
import SearchFilter from './SearchFilter';
import PostList from './PostList';
import Header from './Header';

// Styles
import './../styles/HomePage.css';
import Welcome from './Welcome';
import Context from '../context/Context';

class HomePage extends React.Component {
  
  state = {
    loggedIn: null,
  }

  componentDidMount() {
    if (!!window.sessionStorage.getItem('movierec-auth-token')) {
      this.setState({loggedIn: true})
    }
  }

  render() {
    return (
      <Context.Consumer>
        {value => {

          console.log('CDM', value.state.visited);
          console.log(!!window.sessionStorage.getItem('movierec-auth-token'));
          return (
            <>
              <Header />
              {!!window.sessionStorage.getItem('movierec-auth-token') === false ? <Welcome /> : null}
              {console.log(!!window.sessionStorage.getItem('movierec-auth-token'))}
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