import { setUsersInStorage } from './customStorage.js';

function generateUsers() {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((data) => setUsersInStorage(data));
}

export default generateUsers;
