// Local dependencies
import config from './../config';

const votesService = {
  // GIVE TO API
  addVote(newVoteData) {

    return fetch(`${config.API_ENDPOINT}/votes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newVoteData),
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
  updateVote(updatedVoteData) {

    return fetch(`${config.API_ENDPOINT}/votes`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(updatedVoteData),
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
  
}

export default votesService;