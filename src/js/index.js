import createBoards from './createBoards.js';
import { addEventListeners, dragAndDrop } from './addEventListeners.js';
import startClock from './startClock.js';
import calculateTodoCounts from './calculateTodoCounts.js';
import getUsersFromApi from './generateUsers.js';
import { initUsers } from './customStorage.js';

function initApp() {
  startClock();
  createBoards();
  calculateTodoCounts();
  addEventListeners();
  dragAndDrop();
}

getUsersFromApi()
  .then((data) => initUsers(data))
  .then(() => initApp());
