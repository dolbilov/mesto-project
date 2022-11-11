import Popup from "./Popup";
import * as constants from "../utils/constants";

export default class ProfilePopup extends Popup {
  constructor() {
    super();
    this._nameInput = constants.profilePopupNameInput;
    this._aboutInput = constants.profilePopupAboutInput;
  }

  open() {
    super.open();
    this._fillForm();
  }

  _fillForm() {
    this._nameInput.value = constants.profileName.textContent;
    this._aboutInput.value = constants.profileDescription.textContent;
  }
}
