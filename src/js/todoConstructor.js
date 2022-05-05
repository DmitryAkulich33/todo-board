import { STATE_NEW } from './constants.js';

function Todo(id, title, description, userId) {
  this.id = id;
  this.title = title;
  this.description = description;
  this.userId = userId;
  this.state = STATE_NEW;
  this.date = new Date().toLocaleDateString();
}

export default Todo;
