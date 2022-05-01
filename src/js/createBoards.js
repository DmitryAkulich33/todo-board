import { todos, users } from './customStorage.js';
import createTodoItem from './createTodoItem.js';

function createBoards() {
  const lists = document.querySelectorAll('.list');
  todos.forEach((elem) => {
    const user = users.find((user) => user.id === elem.userId);
    const newItem = createTodoItem(elem, user);
    switch (elem.state) {
      case 'new':
        lists[0].append(newItem);
        break;
      case 'in progress':
        lists[1].append(newItem);
        break;
      case 'completed':
        lists[2].append(newItem);
        break;
    }
  });
}

export default createBoards;
