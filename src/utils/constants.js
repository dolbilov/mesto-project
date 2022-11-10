const selectors = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible"
};

// Profile info
export const profileName = document.querySelector(".profile__name-text");
export const profileDescription = document.querySelector(".profile__description");
export const profileAvatarContainer = document.querySelector(".profile__image-container");
export const profileAvatar = document.querySelector(".profile__image");
export const profileEditButton = document.querySelector(".profile__edit-button");

// Profile popup
export const profilePopup = document.querySelector(".popup_type_profile");
export const profilePopupForm = profilePopup.querySelector(selectors.formSelector);
export const profilePopupNameInput = profilePopupForm.querySelector("#name");
export const profilePopupDescriptionInput = profilePopupForm.querySelector("#about");
export const profilePopupSubmitButton = profilePopupForm.querySelector(selectors.submitButtonSelector);

// Image popup
export const previewPopup = document.querySelector(".popup_type_image");
export const previewPopupImage = previewPopup.querySelector(".popup__image");
export const previewPopupHeading = previewPopup.querySelector(".popup__image-heading");

// Card add popup
export const addButton = document.querySelector(".profile__add-button");
export const newCardPopup = document.querySelector(".popup_type_card");
export const newCardPopupForm = newCardPopup.querySelector(selectors.formSelector);
export const newCardPopupHeadingInput = newCardPopupForm.querySelector("#place-heading");
export const newCardPopupLinkInput = newCardPopupForm.querySelector("#link");
export const newCardPopupSubmitButton = newCardPopupForm.querySelector(selectors.submitButtonSelector);

// Avatar popup
export const avatarPopup = document.querySelector(".popup_type_avatar");
export const avatarForm = avatarPopup.querySelector(selectors.formSelector);
export const newAvatarLinkInput = avatarForm.querySelector("#avatar-link");
export const avatarPopupSubmitButton = avatarForm.querySelector(selectors.submitButtonSelector);

// Delete card popup
export const deleteCardPopup = document.querySelector(".popup_type_delete-card");

export const cardsContainer = document.querySelector(".cards__list");
export const cardTemplate = document.querySelector("#card").content;

export const timeoutDelay = 1000;
