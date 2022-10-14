('use strict');

let selectors;

function hasInvalidInput(inputList) {
  return inputList.some((input) => !input.validity.valid);
}

export function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(selectors.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(selectors.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

export function enableValidation(params) {
  selectors = params;
  const forms = Array.from(document.querySelectorAll(selectors.formSelector));
  forms.forEach((formElement) => setEventListeners(formElement));
}

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(selectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(selectors.inputErrorClass);
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
}

function checkInputValidaty(formElement, inputElement) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function setEventListeners(formElement) {
  const inputList = Array.from(
    formElement.querySelectorAll(selectors.inputSelector)
  );

  const submitButton = formElement.querySelector(
    selectors.submitButtonSelector
  );

  // check button state at the start
  toggleButtonState(inputList, submitButton);

  inputList.forEach((inputElement) =>
    inputElement.addEventListener('input', () => {
      checkInputValidaty(formElement, inputElement);
      toggleButtonState(inputList, submitButton);
    })
  );
}
