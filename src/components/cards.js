'use strict';

import * as api from './api';
import { handleError } from "./api";

export function createCard(card, cardTemplate, renderPreviewCallback) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__heading").textContent = card.name;

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardImage.addEventListener("click", () => renderPreviewCallback(card.name, card.link));

  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", (evt) => {
      const isLiked = evt.target.classList.contains("card__like-button_active");
      if (isLiked) {
        api.unsetLike(card._id)
          .then(data => {
            console.log(data.likes.length);
          })
          .catch(handleError)
      }
      else {
        api.setLike(card._id)
          .then(data => {
            console.log(data.likes.length);
          })
          .catch(handleError)
      }
      // toggle like button state
      evt.target.classList.toggle("card__like-button_active");
    });

  const deleteButton = cardElement
    .querySelector(".card__delete-button");

  // hide delete button if card is not our
  const cardOwnerId = card.owner._id;
  if (api.userId !== cardOwnerId) {
    deleteButton.classList.add('card__delete-button_hidden');
  }

    deleteButton.addEventListener("click", () => api.deleteCard(card._id)
      .then(() => cardElement.remove()) // remove card from HTML
      .catch(err => console.log(`Ошибка ${err.status}`)));

  return cardElement;
}


