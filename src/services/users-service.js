// Local dependencies
import config from './../config';

const usersService = {
  // GIVE TO API
  postNewUser: (newUserData) => {
    console.log(newUserData);
    return fetch(`${config.API_ENDPOINT}/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(newUserData),
    })
    .then(res => {
      console.log('res status type', typeof res.status);
      if (res && res.status !== 201) {
        return res.json()
      } 
    })
    .catch(error => {
      console.log('Users-Service Error')
      console.log(error);
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