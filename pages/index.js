'use strict';

/* For all popups */
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Close popup when click close button for all popups
document
  .querySelectorAll('.popup__close-button')
  .forEach((item) =>
    item.addEventListener('click', (evt) =>
      closePopup(evt.target.closest('.popup'))
    )
  );

/* Profile popup */
const profilePopup = document.querySelector('.popup_type_profile');
const profileName = document.querySelector('.profile__name-text');
const profileDescription = document.querySelector('.profile__description');
const profileForm = profilePopup.querySelector('.form');
const profileNameInput = profileForm.querySelector('#name');
const profileDescriptionInput = profileForm.querySelector('#about');
const profileSaveButton = profileForm.querySelector('.form__button');

function renderProfilePopup() {
  openPopup(profilePopup);
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function saveProfilePopup(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profilePopup);
}

document
  .querySelector('.profile__edit-button')
  .addEventListener('click', renderProfilePopup);

profileSaveButton.addEventListener('click', saveProfilePopup);
