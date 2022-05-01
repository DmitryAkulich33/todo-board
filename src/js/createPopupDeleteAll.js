import createElement from './createElement.js';

function createDeleteAllPopupForm() {
  const form = createElement('form', 'delete-all-popup-form');
  const cancelBtn = createElement('button', 'delete-all-popup-cancel-btn');
  const confirmBtn = createElement('button', 'delete-all-popup-confirm-btn');

  cancelBtn.type = 'button';
  cancelBtn.innerHTML = 'Cancel';
  confirmBtn.type = 'button';
  confirmBtn.innerHTML = 'Confirm';

  form.append(cancelBtn, confirmBtn);

  return form;
}

function createDeleteAllSpan() {
  const span = createElement('span', 'delete-all-popup-text');
  span.innerHTML = 'Do you really want to delete all items?';

  return span;
}

function createDeleteAllPopup() {
  const body = document.querySelector('body');
  const deleteAllPopup = createElement('div', 'delete-all-popup');
  const deleteAllPopupBody = createElement('div', 'delete-all-popup-body');
  const deleteAllPopupContent = createElement(
    'div',
    'delete-all-popup-content'
  );
  const deleteAllPopupSpan = createDeleteAllSpan();
  const deleteAllPopupForm = createDeleteAllPopupForm();

  deleteAllPopupContent.append(deleteAllPopupSpan, deleteAllPopupForm);
  deleteAllPopupBody.append(deleteAllPopupContent);
  deleteAllPopup.append(deleteAllPopupBody);
  body.append(deleteAllPopup);
}

function removeDeleteAllPopup() {
  const todoPopup = document.querySelector('.delete-all-popup');
  todoPopup.remove();
}

export { createDeleteAllPopup, removeDeleteAllPopup };
