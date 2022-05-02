function calculateTodoCounts() {
  const lists = document.querySelectorAll('.list');
  const newCount = document.querySelector('#new-todo-count');
  const inProgressCount = document.querySelector('#in-progress-todo-count');
  const completedCount = document.querySelector('#completed-todo-count');

  newCount.innerHTML = lists[0].childElementCount;
  inProgressCount.innerHTML = lists[1].childElementCount;
  completedCount.innerHTML = lists[2].childElementCount;
}

export default calculateTodoCounts;
