import Popup from "./Popup";
import { selectors } from "../utils/constants";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitCallback) {
    super(popupSelector);

    this._formSubmitCallback = formSubmitCallback;

    this._form = this._popup.querySelector(selectors.formSelector);
    this._inputList = this._form.querySelectorAll(selectors.inputSelector);
    this._submitButton = this._form.querySelector(selectors.submitButtonSelector);
    this._submitButtonNormalText = this._submitButton.textContent; // text of normal state
  }

  close() {
    super.close();
    this._form.reset();
  }

  renderLoading(isLoading, loadingText = "Сохранение...") {
    this._submitButton.textContent = isLoading ? loadingText : this._submitButtonNormalText;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._formSubmitCallback);
  }

  _getInputValues() {
    this._values = {};

    this._inputList.forEach(input => {
      this._values[input.name] = input.value;
    });

    return this._values;
  }

  setInputValues(values) {
    this._inputList.forEach(input => {
      input.value = values[input.name];
    });
  }

}
