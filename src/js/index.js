import createBoards from './createBoards.js';
import { addEventListeners } from './addEventListeners.js';
import startClock from './startClock.js';
import calculateTodoCounts from './calculateTodoCounts.js';
import getUsersFromApi from './generateUsers.js';
import { initUsers } from './customStorage.js';
import { addDragAndDropEvents } from './addDragAndDropEvents.js';

function initApp() {
  startClock();
  createBoards();
  calculateTodoCounts();
  addEventListeners();
  addDragAndDropEvents();
}

getUsersFromApi()
  .then((data) => initUsers(data))
  .then(() => initApp());
