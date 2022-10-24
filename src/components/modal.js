'use strict';

// All popups
const popups = document.querySelectorAll('.popup');
const deleteCardPopup = document.querySelector('.popup_type_delete-card');
let deleteCardAction;

export function setDeleteCardAction(action) {
  deleteCardAction = action;
}

function closePopupWhenPressEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

export function openPopup(popup) {
  document.addEventListener('keydown', closePopupWhenPressEsc);
  popup.classList.add('popup_opened');
}

export function closePopup(popup) {
  document.removeEventListener('keydown', closePopupWhenPressEsc);
  popup.classList.remove('popup_opened');
}

// close popup when click on overlay
popups.forEach((popup) =>
  popup.addEventListener('mousedown', (evt) => {
    if (
      evt.target.classList.contains('popup') ||
      evt.target.classList.contains('popup__close-button')
    ) {
      closePopup(popup);
    }
  })
);

export function deleteCardAfterConfirm() {
  deleteCardAction();
}
