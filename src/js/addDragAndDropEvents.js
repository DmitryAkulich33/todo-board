import calculateTodoCounts from './calculateTodoCounts.js';
import { todos, setTodosInStorage } from './customStorage.js';
import { parseItemId, parseBoardId } from './parser.js';
import {
  createWarningPopup,
  removeWarningPopup,
} from './createWarningPopup.js';
import { createNewItemActions } from './createTodoItem.js';
import { MAX_COUNT_ITEMS_MESSAGE } from './constants.js';

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
    createWarningPopup(MAX_COUNT_ITEMS_MESSAGE, false);
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
  updateTodoItemButtons(draggedItem, state);
  setTodosInStorage(todos);
  this.append(draggedItem);
  calculateTodoCounts();
}

function updateTodoItemButtons(item, boardState) {
  const todoItemActions = item.querySelector('.list-item-actions');
  todoItemActions.remove();

  const newTodoItemActions = createNewItemActions(boardState);
  item.append(newTodoItemActions);
}

export { addDragAndDropEvents, addDragEventsForElement };
