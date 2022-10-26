"use strict";

// this string need for hot reload of webpack-dev-server
import html from "./index.html";
import "./pages/index.css";

import * as cards from "./components/cards";
import { openPopup, closePopup, deleteCardAfterConfirm } from "./components/modal";
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
const profileAvatarContainer = document.querySelector(".profile__image-container");
const profileAvatar = document.querySelector(".profile__image");
const profileEditButton = document.querySelector(".profile__edit-button");

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
const avatarPopupSubmitButton = avatarForm.querySelector(selectors.submitButtonSelector);

// Delete card popup
const deleteCardPopup = document.querySelector(".popup_type_delete-card");

const cardsContainer = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card").content;

const timeoutDelay = 1000;


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

  profilePopupSubmitButton.textContent = "Сохранение...";

  api.updateProfileInfo(profilePopupNameInput.value, profilePopupDescriptionInput.value)
    .then(data => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;

      closePopup(profilePopup);
    })
    .catch(err => console.log(`Ошибка ${err.status}`))
    .finally(() => setTimeout(() => profilePopupSubmitButton.textContent = "Сохранить", timeoutDelay));
}

// Profile popup listeners
profileEditButton.addEventListener("click", renderProfilePopup);
profilePopupForm.addEventListener("submit", saveProfilePopup);


// New card popup functions
function renderNewCardPopup() {
  // Clear fields
  newCardPopupForm.reset();

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

function saveNewCardPopup(evt) {
  evt.preventDefault();

  newCardPopupSubmitButton.textContent = "Создание...";

  api.createCard(newCardPopupHeadingInput.value, newCardPopupLinkInput.value)
    .then(data => {
      const tempCard = cards.createCard(data, cardTemplate, renderPreviewPopup, deleteCardPopup);
      cardsContainer.prepend(tempCard);

      closePopup(newCardPopup);
    })
    .catch(api.handleError)
    .finally(() => setTimeout(() => newCardPopupSubmitButton.textContent = "Создать", timeoutDelay));
}

// New card popup listeners
addButton.addEventListener("click", renderNewCardPopup);
newCardPopupForm.addEventListener("submit", saveNewCardPopup);


// Preview popup
function renderPreviewPopup(name, link) {
  previewPopupImage.src = link;
  previewPopupImage.alt = name;
  previewPopupHeading.textContent = name;

  openPopup(previewPopup);
}


// Avatar popup functions
function renderProfileAvatarPopup() {
  // Clear fields
  avatarForm.reset();

  // Clear all errors
  validate.hideAllInputsError(avatarForm, selectors);

  validate.toggleButtonState([newAvatarLinkInput], avatarPopupSubmitButton, selectors);

  openPopup(avatarPopup);
}

function saveProfileAvatarPopup(evt) {
  evt.preventDefault();

  avatarPopupSubmitButton.textContent = "Сохранение...";

  const newLink = newAvatarLinkInput.value;
  api.updateAvatar(newLink)
    .then(data => {
      profileAvatar.src = data.avatar;
      closePopup(avatarPopup);
    })
    .catch(api.handleError)
    .finally(() => {
      setTimeout(() => avatarPopupSubmitButton.textContent = "Сохранить", timeoutDelay);
    });
}

// Avatar popup event listeners
profileAvatarContainer.addEventListener("click", renderProfileAvatarPopup);
avatarForm.addEventListener("submit", saveProfileAvatarPopup);


// Delete card popup
deleteCardPopup.addEventListener("submit", (evt) => {
  evt.preventDefault();

  deleteCardAfterConfirm();
});


validate.enableValidation(selectors);


Promise.all([
  api.getProfileData(),
  api.getInitialCards()
])
  .then(data => {
    // get profile data handling
    api.setUserId(data[0]._id);

    profileName.textContent = data[0].name;
    profileDescription.textContent = data[0].about;
    profileAvatar.src = data[0].avatar;

    data[1].reverse().forEach(card => {
      const tempCard = cards.createCard(card, cardTemplate, renderPreviewPopup, deleteCardPopup);
      cardsContainer.prepend(tempCard);
    });
  })
  .catch(api.handleError);


