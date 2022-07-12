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

profileForm.addEventListener('submit', saveProfilePopup);

/* Cards */
const cardsContainer = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card').content;
const cards = [
  {
    name: 'Домбай',
    link: './images/photos/dombay.jpg',
  },
  {
    name: 'Гора Эльбрус',
    link: './images/photos/elbrus.jpg',
  },
  {
    name: 'Карачаево-Черкесия',
    link: './images/photos/karachay-cherkessia.jpg',
  },
  {
    name: 'Московский Кремль',
    link: './images/photos/moscow.png',
  },
  {
    name: 'Нью-Йорк',
    link: './images/photos/new-york.png',
  },
  {
    name: 'Статуя Свободы',
    link: './images/photos/statue-of-liberty.png',
  },
];

function renderCard(name, link) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__heading').textContent = name;
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = link;
  cardImage.alt = name;

  cardElement
    .querySelector('.card__like-button')
    .addEventListener('click', (evt) => {
      evt.target.classList.toggle('card__like-button_active');
    });

  cardElement
    .querySelector('.card__delete-button')
    .addEventListener('click', deleteCard);

  cardsContainer.prepend(cardElement);
}

function renderCards() {
  cards.forEach((item) => renderCard(item.name, item.link));
}

renderCards();

function deleteCard(evt) {
  const card = evt.target.closest('.card');
  card.remove();
}

/* Card add popup */
const addButton = document.querySelector('.profile__add-button');
const cardPopup = document.querySelector('.popup_type_card');
addButton.addEventListener('click', () =>
  cardPopup.classList.add('popup_opened')
);

const cardHeading = cardPopup.querySelector('#place-heading');
const cardLink = cardPopup.querySelector('#link');
const cardForm = cardPopup.querySelector('.form');

function addCard(evt) {
  evt.preventDefault();
  renderCard(cardHeading.value, cardLink.value);
  cardHeading.value = '';
  cardLink.value = '';
  closePopup(cardPopup);
}

cardForm.addEventListener('submit', addCard);
