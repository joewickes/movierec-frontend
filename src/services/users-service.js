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
    })
  }
}



export default usersService;