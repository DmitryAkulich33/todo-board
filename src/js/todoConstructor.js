function Todo(id, title, description, userId) {
  this.id = id;
  this.title = title;
  this.description = description;
  this.userId = userId;
  this.state = 'new';
  this.date = new Date().toLocaleDateString();
}

export default Todo;
