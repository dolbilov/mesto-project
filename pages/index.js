'use strict';

//#region Variables

const cards = [
  {
    name: 'Бруклинский Мост',
    link: './images/photos/brooklyn-bridge.jpg',
  },
  {
    name: 'Москва',
    link: './images/photos/moscow.jpg',
  },
  {
    name: 'Метро Москвы',
    link: './images/photos/moscow-subway.jpg',
  },
  {
    name: 'Нью-Йорк',
    link: './images/photos/new-york.jpg',
  },
  {
    name: 'Зеленоград',
    link: './images/photos/zelenograd.jpg',
  },
  {
    name: 'Статуя Свободы',
    link: './images/photos/statue-of-liberty.jpg',
  },
];

// Profile popup
const profilePopup = document.querySelector('.popup_type_profile');
const profileName = document.querySelector('.profile__name-text');
const profileDescription = document.querySelector('.profile__description');
const profileForm = profilePopup.querySelector('.form');
const profileNameInput = profileForm.querySelector('#name');
const profileDescriptionInput = profileForm.querySelector('#about');
const profileSaveButton = profileForm.querySelector('.form__button');

// Image popup
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupHeading = imagePopup.querySelector('.popup__image-heading');

// Cards
const cardsContainer = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card').content;

// Card add popup
const addButton = document.querySelector('.profile__add-button');
const cardPopup = document.querySelector('.popup_type_card');
const cardHeading = cardPopup.querySelector('#place-heading');
const cardLink = cardPopup.querySelector('#link');
const cardForm = cardPopup.querySelector('.form');

//#endregion

//#region Functions

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

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

function renderCardPopup(evt) {
  openPopup(imagePopup);

  const cardImage = evt.target;
  const card = cardImage.closest('.card');
  const cardHeading = card.querySelector('.card__heading');

  imagePopupImage.src = cardImage.src;
  imagePopupImage.alt = cardHeading.textContent;
  imagePopupHeading.textContent = cardHeading.textContent;
}

function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__heading').textContent = name;
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = link;
  cardImage.alt = name;
  cardImage.addEventListener('click', renderCardPopup);

  cardElement
    .querySelector('.card__like-button')
    .addEventListener('click', (evt) => {
      evt.target.classList.toggle('card__like-button_active');
    });

  cardElement
    .querySelector('.card__delete-button')
    .addEventListener('click', deleteCard);

  return cardElement;
}

function renderCard(card, container) {
  container.prepend(card);
}

function renderCards() {
  cards.forEach((item) =>
    renderCard(createCard(item.name, item.link), cardsContainer)
  );
}

function deleteCard(evt) {
  const card = evt.target.closest('.card');
  card.remove();
}

function addCard(evt) {
  evt.preventDefault();
  renderCard(createCard(cardHeading.value, cardLink.value), cardsContainer);
  cardHeading.value = '';
  cardLink.value = '';
  closePopup(cardPopup);
}

//#endregion

// Close popup when click close button for all popups
document
  .querySelectorAll('.popup__close-button')
  .forEach((item) =>
    item.addEventListener('click', (evt) =>
      closePopup(evt.target.closest('.popup'))
    )
  );

document
  .querySelector('.profile__edit-button')
  .addEventListener('click', renderProfilePopup);

profileForm.addEventListener('submit', saveProfilePopup);
cardForm.addEventListener('submit', addCard);

addButton.addEventListener('click', () => openPopup(cardPopup));

renderCards();
