import createElement from './createElement.js';

function createFormActionButtons() {
  const buttons = createElement('div', 'todo-popup-form-buttons');
  const cancelBtn = createElement('div', 'cancel-btn');
  const confirmlBtn = createElement('div', 'confirm-btn');

  cancelBtn.type = 'button';
  cancelBtn.innerHTML = 'Cancel';
  confirmlBtn.type = 'button';
  confirmlBtn.innerHTML = 'Confirm';
  buttons.append(cancelBtn, confirmlBtn);

  return buttons;
}

function createUserOptions(users) {
  const userOptions = [];
  users.forEach((elem) => {
    const option = createElement('option');
    option.value = elem.id;
    option.innerHTML = `${elem.name} ${elem.surname}`;
    userOptions.push(option);
  });

  return userOptions;
}

function createDefaultUserOption() {
  const defaultOption = createElement('option');
  defaultOption.value = 'default';
  defaultOption.hidden = true;
  defaultOption.select = 'selected';
  defaultOption.innerHTML = 'Select user';

  return defaultOption;
}

function createFormActionsSelect(users) {
  const select = createElement('select', 'user-selector');
  const defaultOption = createDefaultUserOption();
  const userOptions = createUserOptions(users);

  select.name = 'user-selector';
  select.append(defaultOption, ...userOptions);

  return select;
}

function createTodoPopupFormActions(users) {
  const formActions = createElement('div', 'todo-popup-form-actions');
  const select = createFormActionsSelect(users);
  const buttons = createFormActionButtons();

  formActions.append(select, buttons);
  return formActions;
}

function createTodoPopupFormTextarea() {
  const textarea = createElement('textarea', 'todo-item-description');
  textarea.placeholder = 'Enter todo description ...';

  return textarea;
}

function createTodoPopupFormInput() {
  const input = createElement('input', 'todo-item-title');
  input.type = 'text';
  input.placeholder = 'Enter todo title ...';

  return input;
}

function createTodoPopupForm(users) {
  const form = createElement('form', 'todo-popup-form-add');
  const input = createTodoPopupFormInput();
  const textarea = createTodoPopupFormTextarea();
  const formActions = createTodoPopupFormActions(users);

  form.append(input, textarea, formActions);

  return form;
}

function createTodoPopup(users) {
  const body = document.querySelector('body');
  const todoPopup = createElement('div', 'todo-popup');
  const todoPopupBody = createElement('div', 'todo-popup-body');
  const todoPopupContent = createElement('div', 'todo-popup-content');
  const todoPopupForm = createTodoPopupForm(users);

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
