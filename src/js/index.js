import createElement from './createElement.js';
// сделать локально
const lists = document.querySelectorAll('.list');

function addEventListeners() {
  const btn = document.querySelector('.add__btn');
  const popup = document.querySelector('.todo-popup');
  const popupCancelBtn = document.querySelector('.cancel-btn');
  const popupConfirmBtn = document.querySelector('.confirm-btn');
  const popupTextarea = document.querySelector('.todo-item-description');
  const popupInputTitle = document.querySelector('.todo-item-title');
  const popupUserSelector = document.querySelector('.user-selector');

  btn.addEventListener('click', () => {
    popup.classList.remove('hidden-state');
  });

  popupCancelBtn.addEventListener('click', (event) => {
    event.preventDefault();
    // в отдельную функцию clearForm
    popup.classList.add('hidden-state');
    popupTextarea.value = '';
    popupInputTitle.value = '';
    popupUserSelector.options[popupUserSelector.selectedIndex].selected = false;
  });

  popupConfirmBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const newItem = createElement('div', 'list__item');
    newItem.draggable = true;

    const newItemTitle = createElement('div', 'list__item-title');
    const spanTitle = createElement('span');
    spanTitle.innerHTML = popupInputTitle.value;
    newItemTitle.append(spanTitle);

    const newItemDescription = createElement('div', 'list__item-description');
    const pDescription = createElement('p');
    pDescription.innerHTML = popupTextarea.value;
    newItemDescription.append(pDescription);

    const newItemInfo = createElement('div', 'list__item-info');
    const userInfo = createElement('span', 'user-info');
    userInfo.innerHTML =
      popupUserSelector.options[popupUserSelector.selectedIndex].text;
    const timeInfo = createElement('span', 'time-info');
    timeInfo.innerHTML = new Date().toLocaleDateString();
    newItemInfo.append(userInfo, timeInfo);

    const newItemActions = createElement('div', 'list__item-actions');
    const editBtn = createElement('button', 'list__item-edit');
    editBtn.innerHTML = 'Edit todo';
    const deleteBtn = createElement('button', 'list__item-delete');
    deleteBtn.innerHTML = 'Delete';
    newItemActions.append(editBtn, deleteBtn);

    newItem.append(
      newItemTitle,
      newItemDescription,
      newItemInfo,
      newItemActions
    );
    lists[0].append(newItem);
    dragAndDrop();

    //в отдельную функцию clearForm
    popup.classList.add('hidden-state');
    popupTextarea.value = '';
    popupInputTitle.value = '';
    popupUserSelector.options[popupUserSelector.selectedIndex].selected = false;
  });
}

let draggedItem = null;

function dragAndDrop() {
  const listItems = document.querySelectorAll('.list__item');
  const lists = document.querySelectorAll('.list');

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

addEventListeners();
dragAndDrop();
