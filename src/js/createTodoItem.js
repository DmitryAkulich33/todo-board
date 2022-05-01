import createElement from './createElement.js';

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
  userInfo.innerHTML = `${user.name}`;
  const timeInfo = createElement('span', 'time-info');
  timeInfo.innerHTML = item.date;
  newItemInfo.append(userInfo, timeInfo);

  return newItemInfo;
}

function createnewItemActions() {
  const newItemActions = createElement('div', 'list-item-actions');
  const editBtn = createElement('button', 'list-item-edit');
  editBtn.innerHTML = 'Edit todo';
  const deleteBtn = createElement('button', 'list-item-delete');
  deleteBtn.innerHTML = 'Delete';
  newItemActions.append(editBtn, deleteBtn);

  return newItemActions;
}

function createTodoItem(item, user) {
  const newItem = createElement('div', 'list-item');
  newItem.draggable = true;
  newItem.id = `list-item_${item.id}`;

  const newItemTitle = createNewItemTitle(item);
  const newItemDescription = createNewItemDescription(item);
  const newItemInfo = createNewItemInfo(item, user);
  const newItemActions = createnewItemActions();

  newItem.append(newItemTitle, newItemDescription, newItemInfo, newItemActions);

  return newItem;
}

export default createTodoItem;
