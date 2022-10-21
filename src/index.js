"use strict";

// this string need for hot reload of webpack-dev-server
import html from "./index.html";
import "./pages/index.css";

import * as cards from "./components/cards";
import { openPopup, closePopup } from "./components/modal";
import * as validate from "./components/validate";
import * as api from "./components/api";

const selectors = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible"
};

// Profile info
const profileName = document.querySelector(".profile__name-text");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");

// Profile popup
const profilePopup = document.querySelector(".popup_type_profile");
const profilePopupForm = profilePopup.querySelector(selectors.formSelector);
const profilePopupNameInput = profilePopupForm.querySelector("#name");
const profilePopupDescriptionInput = profilePopupForm.querySelector("#about");
const profilePopupSubmitButton = profilePopupForm.querySelector(selectors.submitButtonSelector);

// Image popup
const previewPopup = document.querySelector(".popup_type_image");
const previewPopupImage = previewPopup.querySelector(".popup__image");
const previewPopupHeading = previewPopup.querySelector(".popup__image-heading");

// Card add popup
const addButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector(".popup_type_card");
const newCardPopupForm = newCardPopup.querySelector(selectors.formSelector);
const newCardPopupHeadingInput = newCardPopupForm.querySelector("#place-heading");
const newCardPopupLinkInput = newCardPopupForm.querySelector("#link");
const newCardPopupSubmitButton = newCardPopupForm.querySelector(selectors.submitButtonSelector);

// Avatar popup
const avatarPopup = document.querySelector(".popup_type_avatar");
const avatarForm = avatarPopup.querySelector(selectors.formSelector);
const newAvatarLinkInput = avatarForm.querySelector("#avatar-link");
const avatarPopupSubmitButton =avatarForm.querySelector(selectors.submitButtonSelector);

const cardsContainer = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card").content;


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
  api.updateProfileInfo(profilePopupNameInput.value, profilePopupDescriptionInput.value)
    .then(data => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
    })
    .catch(err => console.log(`Ошибка ${err.status}`));
  closePopup(profilePopup);
}

// Profile popup listeners
document
  .querySelector(".profile__edit-button")
  .addEventListener("click", renderProfilePopup);

profilePopupForm.addEventListener("submit", saveProfilePopup);

// New card popup functions
function renderNewCardPopup() {
  // Clear fields
  newCardPopupHeadingInput.value = "";
  newCardPopupLinkInput.value = "";

  // Clear all errors
  validate.hideAllInputsError(newCardPopupForm, selectors);

  // Toggle submit button state
  validate.toggleButtonState(
    [newCardPopupHeadingInput, newCardPopupLinkInput],
    newCardPopupSubmitButton,
    selectors
  );

  openPopup(newCardPopup);
}

// New card popup listeners
addButton.addEventListener("click", renderNewCardPopup);

newCardPopupForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  api.createCard(newCardPopupHeadingInput.value, newCardPopupLinkInput.value)
    .then(data => {
      const tempCard = cards.createCard(data, cardTemplate, renderPreviewPopup);
      cardsContainer.prepend(tempCard);
    })
    .catch(api.handleError);

  // Clear form inputs
  newCardPopupHeadingInput.value = "";
  newCardPopupLinkInput.value = "";

  closePopup(newCardPopup);
});

function renderPreviewPopup(name, link) {
  previewPopupImage.src = link;
  previewPopupImage.alt = name;
  previewPopupHeading.textContent = name;

  openPopup(previewPopup);
}

// Avatar popup
profileAvatar.addEventListener('click', () => {
  // Clear fields
  newAvatarLinkInput.value = "";

  // Clear all errors
  validate.hideAllInputsError(avatarForm, selectors);

  validate.toggleButtonState([newAvatarLinkInput], avatarPopupSubmitButton, selectors);

  openPopup(avatarPopup);
});

avatarForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const newLink = newAvatarLinkInput.value;
  api.updateAvatar(newLink)
    .then(data => {
      profileAvatar.src = data.avatar;
    })
    .catch(api.handleError)

  closePopup(avatarPopup);
})

validate.enableValidation(selectors);

// Set profile data from server
api.getProfileData()
  .then(data => {
    api.setUserid(data._id);

    profileName.textContent = data.name;
    profileDescription.textContent = data.about;
    profileAvatar.src = data.avatar;
  })
  .catch(api.handleError);

// Get initial cards from server
api.getInitialCards()
  .then(data => data.reverse().forEach(card => {
    const tempCard = cards.createCard(card, cardTemplate, renderPreviewPopup);
    cardsContainer.prepend(tempCard);
  }))
  .catch(api.handleError);
