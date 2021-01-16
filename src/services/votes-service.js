// Local dependencies
import config from './../config';

const votesService = {

  // GIVE TO API
  addVote(voteData) {

    const newVoteStuff = {
      type: 'addNewVote',
      voteData,
    }

    console.log(newVoteStuff);

    return fetch(`${config.API_ENDPOINT}/votes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newVoteStuff),
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
        throw new Error('Can\'t vote right now.');
      })
    ;
  },
  getVoteId(voteData) {
    return fetch(`${config.API_ENDPOINT}/votes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({type:'getVoteId', voteData}),
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
        throw new Error('Can\'t vote right now.');
      })
    ;
  },
  updateVote(id, updatedVoteData) {

    return fetch(`${config.API_ENDPOINT}/votes/${id}`, {
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
          return;
        }
      })
      .catch(error => {
        throw new Error('Can\'t vote right now.');
      })
    ;
  },
  
}

export default votesService;