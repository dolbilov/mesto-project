('use strict');

import html from './index.html';
import './pages/index.css';

import * as cards from './components/cards';
import * as modal from './components/modal';
import * as validate from './components/validate';

// Close popup when click close button for all popups
document
  .querySelectorAll('.popup__close-button')
  .forEach((item) =>
    item.addEventListener('click', (evt) =>
      modal.closePopup(evt.target.closest('.popup'))
    )
  );

document
  .querySelector('.profile__edit-button')
  .addEventListener('click', modal.renderProfilePopup);

modal.profileForm.addEventListener('submit', modal.saveProfilePopup);
modal.cardForm.addEventListener('submit', cards.addCard);

modal.addButton.addEventListener('click', () =>
  modal.openPopup(modal.cardPopup)
);

// close popup when click on overlay
document
  .querySelectorAll('.popup')
  .forEach((popup) =>
    popup.addEventListener('click', () => modal.closePopup(popup))
  );

// prevent closing when click on form
document
  .querySelectorAll('.popup__container')
  .forEach((popupContainer) =>
    popupContainer.addEventListener('click', (evt) => evt.stopPropagation())
  );

cards.renderCards();

validate.enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible',
});
