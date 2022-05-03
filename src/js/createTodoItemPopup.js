import createElement from './createElement.js';

function createFormActionButtons() {
  const buttons = createElement('div', 'todo-popup-form-buttons');
  const cancelBtn = createElement('button', 'cancel-btn');
  const confirmBtn = createElement('button', 'confirm-btn');

  cancelBtn.type = 'button';
  cancelBtn.innerHTML = 'Cancel';
  confirmBtn.type = 'button';
  confirmBtn.innerHTML = 'Confirm';
  buttons.append(cancelBtn, confirmBtn);

  return buttons;
}

function createUserOptions(users, item) {
  const userOptions = [];
  users.forEach((elem) => {
    const option = createElement('option');
    option.value = elem.id;
    option.innerHTML = `${elem.name}`;
    if (item && item.userId == elem.id) {
      option.selected = 'true';
    }
    userOptions.push(option);
  });

  return userOptions;
}

function createDefaultUserOption() {
  const defaultOption = createElement('option');
  defaultOption.value = 'default';
  defaultOption.hidden = true;
  defaultOption.selected = 'true';
  defaultOption.innerHTML = 'Select user';

  return defaultOption;
}

function createFormActionsSelect(users, item) {
  const select = createElement('select', 'user-selector');
  const defaultOption = createDefaultUserOption();
  const userOptions = createUserOptions(users, item);

  select.name = 'user-selector';
  select.append(defaultOption, ...userOptions);

  return select;
}

function createTodoPopupFormActions(users, item) {
  const formActions = createElement('div', 'todo-popup-form-actions');
  const select = createFormActionsSelect(users, item);
  const buttons = createFormActionButtons();

  formActions.append(select, buttons);
  return formActions;
}

function createTodoPopupFormTextarea(item) {
  const textarea = createElement('textarea', 'todo-item-description');
  textarea.placeholder = 'Enter todo description ...';
  textarea.value = item ? item.description : '';

  return textarea;
}

function createTodoPopupFormInput(item) {
  const input = createElement('input', 'todo-item-title');
  input.type = 'text';
  input.placeholder = 'Enter todo title ...';
  input.value = item ? item.title : '';

  return input;
}

function createTodoPopupForm(users, item) {
  const form = createElement('form', 'todo-popup-form-add');
  const input = createTodoPopupFormInput(item);
  const textarea = createTodoPopupFormTextarea(item);
  const formActions = createTodoPopupFormActions(users, item);

  form.append(input, textarea, formActions);

  return form;
}

function createTodoPopup(users, item) {
  const body = document.querySelector('body');
  const todoPopup = createElement('div', 'todo-popup');
  const todoPopupBody = createElement('div', 'todo-popup-body');
  const todoPopupContent = createElement('div', 'todo-popup-content');
  const todoPopupForm = createTodoPopupForm(users, item);

  todoPopupContent.append(todoPopupForm);
  todoPopupBody.append(todoPopupContent);
  todoPopup.append(todoPopupBody);
  body.append(todoPopup);
}

function removeTodoPopup() {
  const todoPopup = document.querySelector('.todo-popup');
  todoPopup.remove();
}

export { createTodoPopup, removeTodoPopup };
