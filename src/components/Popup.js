import {openedPopupClass} from "../utils/constants";

export default class Popup {
  constructor(popup) {
    this._popup = popup;
  }

  openPopup() {
    this._renderPopup();
    this._popup.classList.add(openedPopupClass);
    document.addEventListener('keydown', this._handleEscPressing);
  }

  closePopup() {
    this._savePopupResults();
    this._popup.classList.remove(openedPopupClass);
    document.removeEventListener('keydown', this._handleEscPressing);
  }

  _handleEscPressing(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector(openedPopupClass);
      this.closePopup(openedPopup);
    }
  }

  _renderPopup() {

  }

  _savePopupResults() {

  }
}
