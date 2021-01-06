import React from 'react';

const Context = React.createContext();

export class ContextProvider extends React.Component {
  
  state = {
    loggedIn: window.sessionStorage.getItem('movierec-auth-token'),
    searchValue: null,
  }

  updateSearch = (searchParam) => {
    console.log('Updating search', searchParam);
    this.setState({searchValue: searchParam});
    return searchParam;
  }
  
  render() {
    return (
      <Context.Provider value={{
        state: this.state,
        updateSearch: this.updateSearch,
      }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;