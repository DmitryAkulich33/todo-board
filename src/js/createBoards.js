import { todos, users } from './customStorage.js';
import { createTodoItem } from './createTodoItem.js';
import * as Constants from './constants.js';

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
    case Constants.STATE_NEW:
      return 0;
    case Constants.STATE_IN_PROGRESS:
      return 1;
    case Constants.STATE_COMPLETED:
      return 2;
    default:
      return 0;
  }
}

export default createBoards;
