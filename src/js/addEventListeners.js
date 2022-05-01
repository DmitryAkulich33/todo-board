import { todos, users } from './customStorage.js';
import { createTodoPopup, removeTodoPopup } from './createPopupTodoItem.js';
import createTodoItem from './createTodoItem.js';
import Todo from './todoConstructor.js';

function addEventListeners() {
  const btn = document.querySelector('.add-btn');

  btn.addEventListener('click', () => {
    createTodoPopup(users);
    const popupCancelBtn = document.querySelector('.cancel-btn');
    const popupConfirmBtn = document.querySelector('.confirm-btn');
    const lists = document.querySelectorAll('.list');

    popupCancelBtn.addEventListener('click', (event) => {
      event.preventDefault();
      removeTodoPopup();
    });

    popupConfirmBtn.addEventListener('click', (event) => {
      event.preventDefault();

      const newTodo = createNewTodo();
      const user = users.find((elem) => elem.id == newTodo.userId);
      const createdTodo = createTodoItem(newTodo, user);

      lists[0].append(createdTodo);
      dragAndDrop();
      removeTodoPopup();
    });
  });
}

let draggedItem = null;

function dragAndDrop() {
  const listItems = document.querySelectorAll('.list-item');
  const lists = document.querySelectorAll('.list');

  for (let i = 0; i < listItems.length; i++) {
    const item = listItems[i];

    // это можно в отдельную функцию для каждого айтема вынести
    item.addEventListener('dragstart', () => {
      draggedItem = item;
      setTimeout(() => {
        item.classList.add('hidden-state');
      }, 0);
    });

    item.addEventListener('dragend', () => {
      setTimeout(() => {
        item.classList.remove('hidden-state');
        draggedItem = null;
      }, 0);
    });

    // это можно вынести в отдельную функцию и повесить на все доски изначально
    // драггед айтем привязан к циклу, его нужно передавать походу
    for (let j = 0; j < lists.length; j++) {
      const list = lists[j];

      list.addEventListener('dragover', (event) => event.preventDefault());

      list.addEventListener('drop', function () {
        this.append(draggedItem);
      });
    }
  }
}

function createNewTodo() {
  const popupTextarea = document.querySelector('.todo-item-description');
  const popupInputTitle = document.querySelector('.todo-item-title');
  const popupSelector = document.querySelector('.user-selector');

  const id = todos.length > 0 ? todos[todos.length - 1].id + 1 : 0;
  const title = popupInputTitle.value;
  const description = popupTextarea.value;
  const userId = popupSelector.options[popupSelector.selectedIndex].value;

  return new Todo(id, title, description, userId);
}

export { addEventListeners, dragAndDrop };
