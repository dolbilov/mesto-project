'use strict';

export const cardsContainer = document.querySelector('.cards__list');
export const cardTemplate = document.querySelector('#card').content;

export function deleteCard(evt) {
  const card = evt.target.closest('.card');
  card.remove();
}

