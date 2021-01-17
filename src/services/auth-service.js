// Local dependencies
import config from './../config';

const authService = {
  // GIVE TO API
  authUser(userData) {

    return fetch(`${config.API_ENDPOINT}/auth`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': 'https://peaceful-plateau-85274.herokuapp.com/'
      },
      body: JSON.stringify(userData),
    })
      .then(res => {
        if (!res.ok) {
          return res.json()
            .then(e => Promise.reject(e));
        } else {
          return res.json();
        }
      })
      .catch(error => {
        throw new Error('Can\'t log in right now.');
      })
    ;
  },
  saveAuthToken(token) {
    window.sessionStorage.setItem(config.TOKEN_KEY, token);
  },
  getAuthToken() {
    return window.sessionStorage.getItem(config.TOKEN_KEY);
  },
  hasAuthToken() {
    return !!authService.getAuthToken();
  }
}

export default authService;