const defaultUsers = [
  {
    id: 1,
    name: 'Ivan',
    surname: 'Ivanov',
  },
  {
    id: 2,
    name: 'Petr',
    surname: 'Petrov',
  },
];

const defaultTodos = [
  {
    id: 1,
    title: 'Todo title 1',
    description: 'Todo description 1',
    state: 'new',
    date: '29.04.2022',
    userId: 1,
  },
  {
    id: 2,
    title: 'Todo title 2',
    description: 'Todo description 2',
    state: 'new',
    date: '29.04.2022',
    userId: 1,
  },
  {
    id: 3,
    title: 'Todo title 3',
    description: 'Todo description 3',
    state: 'in progress',
    date: '29.04.2022',
    userId: 1,
  },
  {
    id: 4,
    title: 'Todo title 4',
    description: 'Todo description 4',
    state: 'completed',
    date: '29.04.2022',
    userId: 1,
  },
  {
    id: 5,
    title: 'Todo title 5',
    description: 'Todo description 5',
    state: 'new',
    date: '29.04.2022',
    userId: 2,
  },
  {
    id: 6,
    title: 'Todo title 6',
    description: 'Todo description 6',
    state: 'in progress',
    date: '29.04.2022',
    userId: 2,
  },
];

const todos = getTodosFromStorage() || defaultTodos;
const users = getUsersFromStorage() || defaultUsers;

function setTodosInStorage() {
  window.localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodosFromStorage() {
  return JSON.parse(window.localStorage.getItem('todos'));
}

function setUsersInStorage() {
  window.localStorage.setItem('users', JSON.stringify(todos));
}

function getUsersFromStorage() {
  return JSON.parse(window.localStorage.getItem('users'));
}

export { todos, users, setTodosInStorage };
