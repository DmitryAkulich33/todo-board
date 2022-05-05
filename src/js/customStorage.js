const defaultTodos = [
  {
    id: 1,
    title: 'Homework 1. Git.',
    description:
      'Download and install git.\nCreate repository and clone it locally. \nCreate a new branch. \nPush code there. \nCreate pull request.',
    state: 'completed',
    date: '01.04.2022',
    userId: 1,
  },
  {
    id: 2,
    title: 'Homework 2. Javascript Basic.',
    description:
      'Look through examples file. \nComplete normal level of tasks. \nComplete advanced level of tasks. \nCreate pull request. \nRead additional material.',
    state: 'completed',
    date: '05.04.2022',
    userId: 4,
  },
  {
    id: 3,
    title: 'Homework 3. Javascript Basic.',
    description:
      'Look through examples file. \nComplete normal level of tasks. \nComplete advanced level of tasks. \nCreate pull request. \nRead additional material.',
    state: 'in progress',
    date: '10.04.2022',
    userId: 2,
  },
  {
    id: 4,
    title: 'Homework 4. Javascript Basic.',
    description:
      'Look through examples file. \nComplete normal level of tasks. \nComplete advanced level of tasks. \nCreate pull request. \nRead additional material.',
    state: 'in progress',
    date: '15.04.2022',
    userId: 3,
  },
  {
    id: 5,
    title: 'Homework 5. Javascript Basic.',
    description:
      'Look through examples file. \nComplete normal level of tasks. \nComplete advanced level of tasks. \nCreate pull request. \nRead additional material.',
    state: 'new',
    date: '20.04.2022',
    userId: 5,
  },
  {
    id: 6,
    title: 'Homework 6. Javascript Basic.',
    description:
      'Look through examples file. \nComplete normal level of tasks. \nComplete advanced level of tasks. \nCreate pull request. \nRead additional material.',
    state: 'new',
    date: '29.04.2022',
    userId: 6,
  },
  {
    id: 7,
    title: 'Homework 7. Final project.',
    description:
      'Choose app to implement. \nCreate structure of new app. \nImplement all features mentioned in tech debt. \nTest it. \nFix bugs and prepare to demonstrate app.',
    state: 'new',
    date: '29.04.2022',
    userId: 6,
  },
];

const todos = getTodosFromStorage() || defaultTodos;
let users = [];

function setTodosInStorage() {
  window.localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodosFromStorage() {
  return JSON.parse(window.localStorage.getItem('todos'));
}

function setUsersInStorage(users) {
  window.localStorage.setItem('users', JSON.stringify(users));
}

function getUsersFromStorage() {
  return JSON.parse(window.localStorage.getItem('users'));
}

function initUsers(usersFromApi) {
  setUsersInStorage(usersFromApi);
  users = getUsersFromStorage();
}

export { todos, users, setTodosInStorage, setUsersInStorage, initUsers };
