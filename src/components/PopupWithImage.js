import Popup from "./Popup";
import { previewPopupHeadingSelector, previewPopupImageSelector } from "../utils/constants";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(previewPopupImageSelector);
    this._heading = this._popup.querySelector(previewPopupHeadingSelector);
  }

  open(src, heading) {

    this._image.src = src;
    this._image.alt = heading;
    this._heading.textContent = heading;
  }
}
