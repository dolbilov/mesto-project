('use strict');

import * as validate from './validate';

let openedPopup = null; // popup, that opened now

// Profile info
const profileName = document.querySelector('.profile__name-text');
const profileDescription = document.querySelector('.profile__description');

// Profile popup
const profilePopup = document.querySelector('.popup_type_profile');
export const profileForm = profilePopup.querySelector('.form');
const profileNameInput = profileForm.querySelector('#name');
const profileDescriptionInput = profileForm.querySelector('#about');
const profileSaveButton = profileForm.querySelector('.form__button');

// Image popup
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupHeading = imagePopup.querySelector('.popup__image-heading');

// Card add popup
export const addButton = document.querySelector('.profile__add-button');
export const cardPopup = document.querySelector('.popup_type_card');
export const cardHeading = cardPopup.querySelector('#place-heading');
export const cardLink = cardPopup.querySelector('#link');
export const cardForm = cardPopup.querySelector('.form');

function addEventListenerForClosing(evt) {
  if (evt.key === 'Escape') {
    closePopup(openedPopup);
  }
}

export function openPopup(popup) {
  openedPopup = popup;
  document.addEventListener('keydown', addEventListenerForClosing);
  popup.classList.add('popup_opened');
}

export function closePopup(popup) {
  openedPopup = null;
  document.removeEventListener('keydown', addEventListenerForClosing);
  popup.classList.remove('popup_opened');
}

export function renderProfilePopup() {
  openPopup(profilePopup);
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  // toggle button state when open profile popup
  validate.toggleButtonState(
    [profileNameInput, profileDescriptionInput],
    profileSaveButton
  );
}

export function saveProfilePopup(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profilePopup);
}

export function renderCardPopup(evt) {
  openPopup(imagePopup);

  const cardImage = evt.target;
  const card = cardImage.closest('.card');
  const cardHeading = card.querySelector('.card__heading');

  imagePopupImage.src = cardImage.src;
  imagePopupImage.alt = cardHeading.textContent;
  imagePopupHeading.textContent = cardHeading.textContent;
}
