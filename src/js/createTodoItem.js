import createElement from './createElement.js';
import { STATE_NEW, STATE_COMPLETED } from './constants.js';

function createNewItemTitle(item) {
  const newItemTitle = createElement('div', 'list-item-title');
  const spanTitle = createElement('span');
  spanTitle.innerHTML = item.title;
  newItemTitle.append(spanTitle);

  return newItemTitle;
}

function createNewItemDescription(item) {
  const newItemDescription = createElement('div', 'list-item-description');
  const pDescription = createElement('p');
  pDescription.innerHTML = item.description;
  newItemDescription.append(pDescription);

  return newItemDescription;
}

function createNewItemInfo(item, user) {
  const newItemInfo = createElement('div', 'list-item-info');
  const userInfo = createElement('span', 'user-info');
  userInfo.id = `user-info_${user.id}`;
  userInfo.innerHTML = `${user.name}`;
  const timeInfo = createElement('span', 'time-info');
  timeInfo.innerHTML = item.date;
  newItemInfo.append(userInfo, timeInfo);

  return newItemInfo;
}

function populateButtons(item, editBtn, deleteBtn, boardState) {
  if (boardState == STATE_NEW) {
    item.append(editBtn, deleteBtn);
  }

  if (boardState == STATE_COMPLETED) {
    item.append(deleteBtn);
  }
}

function createNewItemActions(boardState) {
  const newItemActions = createElement('div', 'list-item-actions');
  const editBtn = createElement('button', 'list-item-edit');
  const deleteBtn = createElement('button', 'list-item-delete');

  editBtn.innerHTML = 'Edit todo';
  deleteBtn.innerHTML = 'Delete';
  populateButtons(newItemActions, editBtn, deleteBtn, boardState);

  return newItemActions;
}

function createTodoItem(item, user) {
  const newItem = createElement('div', 'list-item');
  newItem.draggable = true;
  newItem.id = `list-item_${item.id}`;

  const newItemTitle = createNewItemTitle(item);
  const newItemDescription = createNewItemDescription(item);
  const newItemInfo = createNewItemInfo(item, user);
  const newItemActions = createNewItemActions(item.state);

  newItem.append(newItemTitle, newItemDescription, newItemInfo, newItemActions);

  return newItem;
}

export { createTodoItem, createNewItemActions };
