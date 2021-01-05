// Local dependencies
import config from './../config';

const usersService = {
  // GIVE TO API
  postNewUser: (newUserData) => {
    return fetch(`${config.API_ENDPOINT}/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(newUserData),
    })
    .then(res => {
      if (res && res.status !== 201) {
        return res.json()
      } 
    })
    .catch(error => {
      throw new Error('Can\'t create a new user right now.')
    })
  },
  postLogin(credentials) {
    return fetch(`${config.API_ENDPOINT}/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(credentials),
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(e => Promise.reject(e))
        } else {
          return res.json()
        }
      })
  },
}



export default usersService;