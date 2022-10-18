"use strict";

function hasInvalidInput(inputList) {
  return inputList.some((input) => !input.validity.valid);
}

export function toggleButtonState(inputList, buttonElement, selectors) {
  // without this string validity.valid don't update so fast
  inputList.forEach((input) => input.setCustomValidity(''));

  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(selectors.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(selectors.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function showInputError(formElement, inputElement, errorMessage, selectors) {
  inputElement.classList.add(selectors.inputErrorClass);

  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
}

function hideInputError(formElement, inputElement, selectors) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(selectors.inputErrorClass);
  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
}

export function hideAllInputsError(formElement, selectors) {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  inputList.forEach((inputElement) => hideInputError(formElement, inputElement, selectors));
}

function checkInputValidity(formElement, inputElement, selectors) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      selectors
    );
  } else {
    hideInputError(formElement, inputElement, selectors);
  }
}

function setEventListeners(formElement, selectors) {
  const inputList = Array.from(
    formElement.querySelectorAll(selectors.inputSelector)
  );

  const submitButton = formElement.querySelector(
    selectors.submitButtonSelector
  );

  // check button state at the start
  toggleButtonState(inputList, submitButton, selectors);

  inputList.forEach((inputElement) =>
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, selectors);
      toggleButtonState(inputList, submitButton, selectors);
    })
  );
}

export function enableValidation(selectors) {
  const forms = Array.from(document.querySelectorAll(selectors.formSelector));
  forms.forEach((formElement) => setEventListeners(formElement, selectors));
}
