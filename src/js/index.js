// сделать локально
const lists = document.querySelectorAll('.list');

function addTask() {
  const btn = document.querySelector('.add__btn');
  const addBtn = document.querySelector('.add__item-btn');
  const cancelBtn = document.querySelector('.cancel__item-btn');
  const textarea = document.querySelector('.textarea');
  const form = document.querySelector('.form');

  // let value;

  btn.addEventListener('click', () => {
    form.classList.remove('hidden-state');
    btn.classList.add('hidden-state');
    addBtn.classList.add('hidden-state');

    textarea.addEventListener('input', (event) => {
      let value = event.target.value;

      if (value) {
        addBtn.classList.remove('hidden-state');
      } else {
        addBtn.classList.add('hidden-state');
      }
    });
  });

  cancelBtn.addEventListener('click', () => {
    // value = '';
    // создать отдельную функциюю clear
    textarea.value = '';
    form.classList.add('hidden-state');
    btn.classList.remove('hidden-state');
  });

  addBtn.addEventListener('click', () => {
    const newItem = document.createElement('div');
    newItem.classList.add('list__item');
    newItem.draggable = true;
    newItem.textContent = textarea.value;
    lists[0].append(newItem);

    // создать отдельную функциюю clear
    textarea.value = '';
    form.classList.add('hidden-state');
    btn.classList.remove('hidden-state');

    dragAndDrop();
  });
}

function dragAndDrop() {
  const listItems = document.querySelectorAll('.list__item');
  const lists = document.querySelectorAll('.list');
  let draggedItem = null;

  for (let i = 0; i < listItems.length; i++) {
    const item = listItems[i];

    // это можно в отдельную функцию для каждого айтема вынести
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

    // это можно вынести в отдельную функцию и повесить на все доски изначально
    // драггед айтем привязан к циклу, его нужно передавать походу
    for (let j = 0; j < lists.length; j++) {
      const list = lists[j];

      list.addEventListener('dragover', (event) => event.preventDefault());
      list.addEventListener('dragenter', function (event) {
        event.preventDefault();
        this.classList.add('shadow-item');
      });

      list.addEventListener('dragleave', function (event) {
        event.preventDefault();
        this.classList.remove('shadow-item');
      });

      list.addEventListener('drop', function () {
        this.classList.remove('shadow-item');
        this.append(draggedItem);
      });
    }
  }
}

addTask();
dragAndDrop();
