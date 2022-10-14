('use strict');

import { cards } from './data';
import * as modal from './modal';

const cardsContainer = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card').content;

function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__heading').textContent = name;
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = link;
  cardImage.alt = name;
  cardImage.addEventListener('click', modal.renderCardPopup);

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

export function renderCards() {
  cards.forEach((item) =>
    renderCard(createCard(item.name, item.link), cardsContainer)
  );
}

export function deleteCard(evt) {
  const card = evt.target.closest('.card');
  card.remove();
}

export function addCard(evt) {
  evt.preventDefault();
  const tempCard = createCard(modal.cardHeading.value, modal.cardLink.value);
  renderCard(tempCard, cardsContainer);
  cardHeading.value = '';
  cardLink.value = '';
  closePopup(cardPopup);
}
