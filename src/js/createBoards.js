import { todos, users } from './customStorage.js';
import { createTodoItem } from './createTodoItem.js';

function createBoards() {
  const lists = document.querySelectorAll('.list');
  todos.forEach((elem) => {
    const user = users.find((user) => user.id === elem.userId);
    const newItem = createTodoItem(elem, user);
    const boardIndex = getBoardIndex(elem.state);
    lists[boardIndex].append(newItem);
  });
}

function getBoardIndex(state) {
  switch (state) {
    case 'new':
      return 0;
    case 'in progress':
      return 1;
    case 'completed':
      return 2;
    default:
      return 0;
  }
}

export default createBoards;
