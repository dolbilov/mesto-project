'use strict';

// this string need for hot reload of webpack-dev-server
import html from './index.html';
import './pages/index.css';

import * as cards from './components/cards';
import { openPopup, closePopup } from './components/modal';
import * as validate from './components/validate';
import { toggleButtonState } from "./components/validate";

const selectors = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible',
};

// Profile info
const profileName = document.querySelector('.profile__name-text');
const profileDescription = document.querySelector('.profile__description');

// Profile popup
const profilePopup = document.querySelector('.popup_type_profile');
const profilePopupForm = profilePopup.querySelector(selectors.formSelector);
const profilePopupNameInput = profilePopupForm.querySelector('#name');
const profilePopupDescriptionInput = profilePopupForm.querySelector('#about');
const profilePopupSubmitButton = profilePopupForm.querySelector(
  selectors.submitButtonSelector
);

// Image popup
const previewPopup = document.querySelector('.popup_type_image');
const previewPopupImage = previewPopup.querySelector('.popup__image');
const previewPopupHeading = previewPopup.querySelector('.popup__image-heading');

// Card add popup
const addButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_card');
const newCardPopupForm = newCardPopup.querySelector(selectors.formSelector);
const newCardPopupHeadingInput = newCardPopupForm.querySelector('#place-heading');
const newCardPopupLinkInput = newCardPopupForm.querySelector('#link');
const newCardPopupSubmitButton = newCardPopupForm.querySelector(
  selectors.submitButtonSelector
);

const cardsContainer = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card').content;


// Profile popup functions
function renderProfilePopup() {
  // Set inputs value as profile info
  profilePopupNameInput.value = profileName.textContent;
  profilePopupDescriptionInput.value = profileDescription.textContent;

  // Clear all errors
  validate.hideAllInputsError(profilePopupForm, selectors);

  // Toggle submit button state
  validate.toggleButtonState(
    [profilePopupNameInput, profilePopupDescriptionInput],
    profilePopupSubmitButton,
    selectors
  );

  openPopup(profilePopup);
}

function saveProfilePopup(evt) {
  evt.preventDefault();
  profileName.textContent = profilePopupNameInput.value;
  profileDescription.textContent = profilePopupDescriptionInput.value;
  closePopup(profilePopup);
}


// Profile popup listeners
document
  .querySelector('.profile__edit-button')
  .addEventListener('click', renderProfilePopup);

profilePopupForm.addEventListener('submit', saveProfilePopup);


// New card popup listeners
addButton.addEventListener('click', () => {
  // Clear fields
  newCardPopupHeadingInput.value = '';
  newCardPopupLinkInput.value = '';

  // Clear all errors
  validate.hideAllInputsError(newCardPopupForm, selectors);

  // Toggle submit button state
  toggleButtonState(
    [newCardPopupHeadingInput, newCardPopupLinkInput],
    newCardPopupSubmitButton,
    selectors
  );

  openPopup(newCardPopup);
});

newCardPopupForm.addEventListener('submit', (evt) =>
  cards.addCard(
    evt,
    newCardPopupHeadingInput,
    newCardPopupLinkInput,
    cardsContainer,
    newCardPopup,
    cardTemplate
  )
);


function renderNewCardPopup(name, link) {
  openPopup(previewPopup);

  previewPopupImage.src = link;
  previewPopupImage.alt = name;
  previewPopupHeading.textContent = name;
}

cards.renderCards(cardsContainer, cardTemplate, renderNewCardPopup);

validate.enableValidation(selectors);
