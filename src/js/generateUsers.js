import { URL } from './constants.js';

function getUsersFromApi() {
  return fetch(URL).then((response) => response.json());
}

export default getUsersFromApi;
