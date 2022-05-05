import { todos, users, setTodosInStorage } from './customStorage.js';
import { createTodoPopup, removeTodoPopup } from './createTodoItemPopup.js';
import { createTodoItem } from './createTodoItem.js';
import Todo from './todoConstructor.js';
import {
  createWarningPopup,
  removeWarningPopup,
} from './createWarningPopup.js';
import calculateTodoCounts from './calculateTodoCounts.js';
import checkPopupFields from './checkPopupFields.js';
import { addDragEventsForElement } from './addDragAndDropEvents.js';
import { parseItemId } from './parser.js';
import { DELETE_ALL_MESSAGE, STATE_COMPLETED } from './constants.js';

function addEventListeners() {
  const addBtn = document.querySelector('.add-btn');
  const lists = document.querySelectorAll('.list');
  const deleteAll = document.querySelector('.delete-all-btn');

  addBtn.addEventListener('click', () => {
    createTodoPopup(users);
    const popupCancelBtn = document.querySelector('.cancel-btn');
    const popupConfirmBtn = document.querySelector('.confirm-btn');

    popupCancelBtn.addEventListener('click', (event) => {
      event.preventDefault();
      removeTodoPopup();
    });

    popupConfirmBtn.addEventListener('click', (event) => {
      event.preventDefault();
      const newTodo = createNewTodo();
      if (!newTodo) return;

      const user = users.find((elem) => elem.id == newTodo.userId);
      const createdTodo = createTodoItem(newTodo, user);

      todos.push(newTodo);
      lists[0].append(createdTodo);
      setTodosInStorage();
      addDragEventsForElement(createdTodo);
      removeTodoPopup();
      calculateTodoCounts();
    });
  });

  deleteAll.addEventListener('click', () => {
    createWarningPopup(DELETE_ALL_MESSAGE, true);
    const cancelBtn = document.querySelector('.warning-popup-cancel-btn');
    const confirmBtn = document.querySelector('.warning-popup-confirm-btn');

    cancelBtn.addEventListener('click', (event) => {
      event.preventDefault();
      removeWarningPopup();
    });

    confirmBtn.addEventListener('click', (event) => {
      event.preventDefault();
      const completedBoard = document.querySelector('#boards-item_completed');
      const completedList = completedBoard.querySelector('.list');
      completedList.innerHTML = '';

      removeAllCompletedTodo();
      setTodosInStorage();
      removeWarningPopup();
      calculateTodoCounts();
    });
  });

  lists.forEach((elem) =>
    elem.addEventListener('click', (event) => {
      const item = event.target.closest('.list-item');
      const { classList: targetClasslist } = event.target;
      const id = parseItemId(item.id);
      const index = todos.findIndex((item) => item.id === id);

      if (targetClasslist.contains('list-item-delete')) {
        todos.splice(index, 1);
        item.remove();
        setTodosInStorage(todos);
        calculateTodoCounts();
      }

      if (targetClasslist.contains('list-item-edit')) {
        createTodoPopup(users, todos[index]);
        const popupCancelBtn = document.querySelector('.cancel-btn');
        const popupConfirmBtn = document.querySelector('.confirm-btn');

        popupCancelBtn.addEventListener('click', (event) => {
          event.preventDefault();
          removeTodoPopup();
        });

        popupConfirmBtn.addEventListener('click', (event) => {
          event.preventDefault();
          const todo = todos[index];

          if (!updateTodoArray(todo)) return;
          updateTodoElement(item, todo);
          setTodosInStorage();
          removeTodoPopup();
        });
      }
    })
  );
}

function createNewTodo() {
  const popupTextarea = document.querySelector('.todo-item-description');
  const popupInputTitle = document.querySelector('.todo-item-title');
  const popupSelector = document.querySelector('.user-selector');

  const id = todos.length > 0 ? todos[todos.length - 1].id + 1 : 0;
  const title = popupInputTitle.value;
  const description = popupTextarea.value;
  const userId = Number(
    popupSelector.options[popupSelector.selectedIndex].value
  );

  if (!checkPopupFields(title, description, userId)) return;

  return new Todo(id, title, description, userId);
}

function updateTodoArray(elem) {
  const title = document.querySelector('.todo-item-title');
  const description = document.querySelector('.todo-item-description');
  const popupSelector = document.querySelector('.user-selector');

  const newTitle = title.value;
  const newDescription = description.value;
  const newUserId = Number(
    popupSelector.options[popupSelector.selectedIndex].value
  );

  if (!checkPopupFields(newTitle, newDescription, newUserId)) return;

  elem.title = newTitle;
  elem.description = newDescription;
  elem.userId = newUserId;
  elem.date = new Date().toLocaleDateString();

  return elem;
}

function updateTodoElement(item, elem) {
  const title = item.querySelector('.list-item-title');
  const description = item.querySelector('.list-item-description');
  const userInfo = item.querySelector('.user-info');
  const dateInfo = item.querySelector('.time-info');

  title.innerHTML = elem.title;
  description.innerHTML = elem.description;
  userInfo.innerHTML = users.find((item) => item.id == elem.userId).name;
  dateInfo.innerHTML = new Date().toLocaleDateString();
}

function removeAllCompletedTodo() {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].state == STATE_COMPLETED) {
      todos.splice(i, 1);
      i--;
    }
  }
}

export { addEventListeners };
