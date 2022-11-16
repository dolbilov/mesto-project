import { openedPopupClass } from "../utils/constants";

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add(openedPopupClass);
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove(openedPopupClass);
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this._popup.addEventListener("mousedown", evt => {
      if (
        evt.target.classList.contains("popup") ||
        evt.target.classList.contains("popup__close-button")
      ) {
        this.close();
      }
    });
  }
}
