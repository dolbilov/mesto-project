import Popup from "./Popup";
import { previewPopupHeadingSelector, previewPopupImageSelector } from "../utils/constants";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._image = this._popup.querySelector(previewPopupImageSelector);
    this._heading = this._popup.querySelector(previewPopupHeadingSelector);
  }

  open({ link, name }) {
    super.open();

    this._image.src = link;
    this._image.alt = name;
    this._heading.textContent = name;
  }
}
