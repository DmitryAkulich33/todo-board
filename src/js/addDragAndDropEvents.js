import calculateTodoCounts from './calculateTodoCounts.js';
import { todos, setTodosInStorage } from './customStorage.js';
import { parseItemId, parseBoardId } from './parser.js';
import {
  createWarningPopup,
  removeWarningPopup,
} from './createWarningPopup.js';

let draggedItem = null;

function addDragAndDropEvents() {
  const listItems = document.querySelectorAll('.list-item');
  const lists = document.querySelectorAll('.list');

  listItems.forEach((elem) => {
    elem.addEventListener('dragstart', dragStart);
    elem.addEventListener('dragend', dragEnd);
  });

  lists.forEach((list) => {
    list.addEventListener('dragover', dragOver);
    list.addEventListener('drop', dragDrop);
  });
}

function addDragEventsForElement(elem) {
  elem.addEventListener('dragstart', dragStart);
  elem.addEventListener('dragend', dragEnd);
}

function dragStart(event) {
  draggedItem = event.target;
  setTimeout(() => {
    event.target.classList.add('hidden-state');
  }, 0);
}

function dragEnd(event) {
  setTimeout(() => {
    event.target.classList.remove('hidden-state');
    draggedItem = null;
  }, 0);
}

function dragOver(event) {
  event.preventDefault();
}

function dragDrop(event) {
  const board = event.target.closest('.boards-item');
  const list = board.querySelector('.list');

  if (list.childElementCount >= 6 && list.closest('#boards-item_in-progress')) {
    if (document.querySelector('.warning-popup')) return;
    createWarningPopup('Items > 6', false);
    const confirmBtn = document.querySelector('.warning-popup-confirm-btn');

    confirmBtn.addEventListener('click', (event) => {
      event.preventDefault();
      event.target.classList.remove('hidden-state');
      removeWarningPopup();
    });
    return;
  }

  let state = parseBoardId(board.id);
  const id = parseItemId(draggedItem.id);
  const todoItem = todos.find((item) => item.id == id);
  todoItem.state = state;

  setTodosInStorage(todos);
  this.append(draggedItem);
  calculateTodoCounts();
}

export { addDragAndDropEvents, addDragEventsForElement };

// if (
//   list.childElementCount >= 6 &&
//   list.closest('#boards-item-in-progress')
// ) {
//   if (document.querySelector('.warning-popup')) return;
//   createWarningPopup('Items > 6', false);
//   const confirmBtn = document.querySelector(
//     '.warning-popup-confirm-btn'
//   );

//   confirmBtn.addEventListener('click', (event) => {
//     event.preventDefault();
//     item.classList.remove('hidden-state');
//     removeWarningPopup();
//   });
//   return;
// }
