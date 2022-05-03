import createElement from './createElement.js';

function createWarningPopupForm(isCancelButton) {
  const form = createElement('form', 'warning-popup-form');

  if (isCancelButton) {
    const cancelBtn = createElement('button', 'warning-popup-cancel-btn');
    cancelBtn.type = 'button';
    cancelBtn.innerHTML = 'Cancel';
    form.append(cancelBtn);
  }

  const confirmBtn = createElement('button', 'warning-popup-confirm-btn');
  confirmBtn.type = 'button';
  confirmBtn.innerHTML = 'Confirm';

  form.append(confirmBtn);

  return form;
}

function createWarningSpan(warningMessage) {
  const span = createElement('span', 'warning-popup-text');
  span.innerHTML = warningMessage;

  return span;
}

function createWarningPopup(warningMessage, isCancelButton) {
  const body = document.querySelector('body');
  const warningPopup = createElement('div', 'warning-popup');
  const warningPopupBody = createElement('div', 'warning-popup-body');
  const warningPopupContent = createElement('div', 'warning-popup-content');
  const warningPopupSpan = createWarningSpan(warningMessage);
  const warningPopupForm = createWarningPopupForm(isCancelButton);

  warningPopupContent.append(warningPopupSpan, warningPopupForm);
  warningPopupBody.append(warningPopupContent);
  warningPopup.append(warningPopupBody);
  body.append(warningPopup);
}

function removeWarningPopup() {
  const warningPopup = document.querySelector('.warning-popup');
  warningPopup.remove();
}

export { createWarningPopup, removeWarningPopup };
