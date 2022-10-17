"use strict";

// this string need for hot reload of webpack-dev-server
import html from "./index.html";
import "./pages/index.css";

import { deleteCard } from "./components/cards";
import { openPopup, closePopup } from "./components/modal";
import * as validate from "./components/validate";
import { cardsContainer, cardTemplate } from "./components/cards";
import { cardsData } from "./components/data";

// Profile info
const profileName = document.querySelector(".profile__name-text");
const profileDescription = document.querySelector(".profile__description");

// Profile popup
const profilePopup = document.querySelector(".popup_type_profile");
const profileForm = profilePopup.querySelector(".form");
const profileNameInput = profileForm.querySelector("#name");
const profileDescriptionInput = profileForm.querySelector("#about");
const profileSaveButton = profileForm.querySelector(".form__button");

// Image popup
const imagePopup = document.querySelector(".popup_type_image");
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupHeading = imagePopup.querySelector(".popup__image-heading");

// Card add popup
const addButton = document.querySelector(".profile__add-button");
const cardPopup = document.querySelector(".popup_type_card");
export const cardForm = cardPopup.querySelector(".form");
const cardHeadingInput = cardForm.querySelector("#place-heading");
const cardLinkInput = cardForm.querySelector("#link");


document
  .querySelector(".profile__edit-button")
  .addEventListener("click", renderProfilePopup);

profileForm.addEventListener("submit", saveProfilePopup);
cardForm.addEventListener("submit", addCard);

addButton.addEventListener("click", () =>
  openPopup(cardPopup)
);

function renderProfilePopup() {
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

export function renderCardPopup(name, link) {
  openPopup(imagePopup);

  imagePopupImage.src = link;
  imagePopupImage.alt = name;
  imagePopupHeading.textContent = name;
}

export function renderCard(card, container) {
  container.prepend(card);
}

export function renderCards() {
  cardsData.forEach((item) =>
    renderCard(createCard(item.name, item.link), cardsContainer)
  );
}

export function createCard(name, link) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__heading").textContent = name;

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = link;
  cardImage.alt = name;
  cardImage.addEventListener("click", () => renderCardPopup(name, link));

  cardElement
    .querySelector(".card__like-button")
    .addEventListener("mousedown", (evt) => {
      evt.target.classList.toggle("card__like-button_active");
    });

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("mousedown", deleteCard);

  return cardElement;
}

function addCard(evt) {
  evt.preventDefault();

  const tempCard = createCard(cardHeadingInput.value, cardLinkInput.value);
  renderCard(tempCard, cardsContainer);

  // Clear form inputs
  cardHeadingInput.value = "";
  cardLinkInput.value = "";

  closePopup(cardPopup);
}

renderCards();

validate.enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible"
});
