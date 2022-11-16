export default class FormValidator {
  constructor(selectors, formElement) {
    this._selectors = selectors;
    this._form = formElement;
    this._inputList = Array.from(this._form.querySelectorAll(selectors.inputSelector));
    this._submitButton = this._form.querySelector(selectors.submitButtonSelector);
  }

  _hasInvalidInput() {
    return this._inputList.some(input => !input.validity.valid);
  }

  toggleButtonState() {
    // without this string validity.valid don't update so fast
    this._inputList.forEach(input => input.setCustomValidity(""));

    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._selectors.inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._selectors.inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  _showInputError(inputElement, errorMessage) {
    inputElement.classList.add(this._selectors.inputErrorClass);

    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add("form__input-error_active");
  }

  _hideInputError(inputElement) {
    inputElement.classList.remove(this._selectors.inputErrorClass);

    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    console.log(errorElement);
    errorElement.classList.remove("form__input-error_active");
    errorElement.textContent = "";
  }

  hideAllInputsErrors() {
    this._inputList.forEach(input => {
      this._hideInputError(input);
    });
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._inputList.forEach(input =>
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this.toggleButtonState();
      })
    );
  }

  enableValidation() {
    this._setEventListeners();

    // check button state at the start
    this.toggleButtonState();
  }
}
