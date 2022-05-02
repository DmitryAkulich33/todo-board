import createBoards from './createBoards.js';
import { addEventListeners, dragAndDrop } from './addEventListeners.js';
import startClock from './startClock.js';
import updateTodoCounts from './updateTodoCounts.js';

function initApp() {
  startClock();
  createBoards();
  updateTodoCounts();
  addEventListeners();
  dragAndDrop();
}

initApp();
