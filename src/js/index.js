import createBoards from './createBoards.js';
import { addEventListeners, dragAndDrop } from './addEventListeners.js';
import startClock from './startClock.js';
import updateTodoCounts from './updateTodoCounts.js';
// import generateUsers from './generateUsers.js';

function initApp() {
  startClock();
  // generateUsers();
  createBoards();
  updateTodoCounts();
  addEventListeners();
  dragAndDrop();
}

initApp();
