'use strict';

// All popups
const popups = document.querySelectorAll('.popup');

function addEventListenerForClosing(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

export function openPopup(popup) {
  document.addEventListener('keydown', addEventListenerForClosing);
  popup.classList.add('popup_opened');
}

export function closePopup(popup) {
  document.removeEventListener('keydown', addEventListenerForClosing);
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
