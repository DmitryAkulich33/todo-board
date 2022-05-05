import createElement from './createElement.js';
import * as Constants from './constants.js';

function checkPopupFields(title, description, userId) {
  const errorMessages = document.querySelectorAll('.popup-error-message');
  let isValid = true;
  if (errorMessages.length > 0) {
    errorMessages.forEach((elem) => elem.remove());
  }
  if (!title || !description || !userId) {
    const popupInputTitle = document.querySelector('.todo-item-title');
    const popupTextarea = document.querySelector('.todo-item-description');
    const popupActions = document.querySelector('.todo-popup-form-actions');
    isValid = false;

    if (!title) {
      const inputErrorMessage = createElement('span', 'popup-error-message');
      inputErrorMessage.innerHTML = Constants.EMPTY_TITLE_MESSAGE;
      popupInputTitle.after(inputErrorMessage);
    }
    if (!description) {
      const textareaErrorMessage = createElement('span', 'popup-error-message');
      textareaErrorMessage.innerHTML = Constants.EMPTY_DESCRIPTION_MESSAGE;
      popupTextarea.after(textareaErrorMessage);
    }
    if (!userId) {
      const selectErrorMessage = createElement('span', 'popup-error-message');
      selectErrorMessage.innerHTML = Constants.EMPTY_SELECT_MESSAGE;
      popupActions.after(selectErrorMessage);
    }
  }
  return isValid;
}

export default checkPopupFields;
