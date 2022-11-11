import Popup from "./Popup";
import { selectors } from "../utils/constants";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitCallback) {
    super(popupSelector);
    this._form = this._popup.querySelector(selectors.formSelector);
    this._formSubmitCallback = formSubmitCallback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._formSubmitCallback);
  }

  close() {
    super.close();
    this._form.reset();
    this._formSubmitCallback();
  }
}
