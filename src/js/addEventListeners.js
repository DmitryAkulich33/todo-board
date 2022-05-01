import { todos, users, setTodosInStorage } from './customStorage.js';
import { createTodoPopup, removeTodoPopup } from './createPopupTodoItem.js';
import createTodoItem from './createTodoItem.js';
import Todo from './todoConstructor.js';

function addEventListeners() {
  const btn = document.querySelector('.add-btn');
  const lists = document.querySelectorAll('.list');

  btn.addEventListener('click', () => {
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
      const user = users.find((elem) => elem.id == newTodo.userId);
      const createdTodo = createTodoItem(newTodo, user);

      todos.push(newTodo);
      lists[0].append(createdTodo);
      setTodosInStorage();
      dragAndDrop();
      removeTodoPopup();
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
      }
    })
  );
}

let draggedItem = null;

function dragAndDrop() {
  const listItems = document.querySelectorAll('.list-item');
  const lists = document.querySelectorAll('.list');

  for (let i = 0; i < listItems.length; i++) {
    const item = listItems[i];

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

    for (let j = 0; j < lists.length; j++) {
      const list = lists[j];

      list.addEventListener('dragover', (event) => event.preventDefault());

      list.addEventListener('drop', function () {
        let state = '';
        switch (j) {
          case 0:
            state = 'new';
            break;
          case 1:
            state = 'in progress';
            break;
          case 2:
            state = 'completed';
            break;
        }
        const id = parseItemId(draggedItem.id);
        const todoItem = todos.find((item) => item.id == id);
        todoItem.state = state;

        setTodosInStorage(todos);
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
  const userId = Number(
    popupSelector.options[popupSelector.selectedIndex].value
  );

  return new Todo(id, title, description, userId);
}

function parseItemId(id) {
  return Number(id.split('_')[1]);
}

export { addEventListeners, dragAndDrop };
