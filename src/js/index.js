import createBoards from './createBoards.js';
import { addEventListeners, dragAndDrop } from './addEventListeners.js';

function initApp() {
  createBoards();
  addEventListeners();
  dragAndDrop();
}

initApp();
