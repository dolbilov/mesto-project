const cohortId = "plus-cohort-16";
const authorizationToken = "604a1865-9670-49d6-afd1-eae792e4450f";
export const config = {
  baseUrl: `https://nomoreparties.co/v1/${cohortId}`,
  headers: {
    authorization: authorizationToken,
    "Content-Type": "application/json"
  }
};

export const selectors = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible"
};

export const openedPopupClass = "popup_opened";

// Popups selectors
export const profilePopupSelector = ".popup_type_profile";
export const newCardPopupSelector = ".popup_type_card";
export const previewPopupSelector = ".popup_type_image";
export const avatarPopupSelector = ".popup_type_avatar";

// Popups
export const profilePopup = document.querySelector(profilePopupSelector);
export const newCardPopup = document.querySelector(newCardPopupSelector);
export const previewPopup = document.querySelector(previewPopupSelector);
export const avatarPopup = document.querySelector(avatarPopupSelector);

// Forms
export const profilePopupForm = profilePopup.querySelector(selectors.formSelector);
export const newCardPopupForm = newCardPopup.querySelector(selectors.formSelector);
export const avatarForm = avatarPopup.querySelector(selectors.formSelector);

// Profile popup inputs
export const profilePopupNameInput = profilePopupForm.querySelector("#name");
export const profilePopupAboutInput = profilePopupForm.querySelector("#about");

// Preview popup
export const previewPopupImageSelector = ".popup__image";
export const previewPopupHeadingSelector = ".popup__image-heading";

// Profile info
export const profileNameSelector = ".profile__name-text";
export const profileDescriptionSelector = ".profile__description";
export const profileAvatarContainer = document.querySelector(".profile__image-container");
export const profileAvatarSelector = ".profile__image";
export const profileEditButton = document.querySelector(".profile__edit-button");

// Profile popup
export const profilePopupSubmitButton = profilePopupForm.querySelector(selectors.submitButtonSelector);

// Card add popup
export const addButton = document.querySelector(".profile__add-button");
export const newCardPopupHeadingInput = newCardPopupForm.querySelector("#place-heading");
export const newCardPopupLinkInput = newCardPopupForm.querySelector("#link");
export const newCardPopupSubmitButton = newCardPopupForm.querySelector(selectors.submitButtonSelector);

// Avatar popup
export const newAvatarLinkInput = avatarForm.querySelector("#avatar-link");
export const avatarPopupSubmitButton = avatarForm.querySelector(selectors.submitButtonSelector);

// Delete card popup
export const deleteCardPopup = document.querySelector(".popup_type_delete-card");

export const cardsContainerSelector = ".cards__list";

export const timeoutDelay = 1000;
