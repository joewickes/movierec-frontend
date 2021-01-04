import React from 'react';

const Context = React.createContext();

export class ContextProvider extends React.Component {
  
  state = {
    loggedIn: window.sessionStorage.getItem('movierec-auth-token'),
    visited: window.localStorage.getItem('visited'),
  }
  
  render() {
    return (
      <Context.Provider value={{
        state: this.state,
      }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;