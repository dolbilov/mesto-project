"use strict";

import * as api from "./api";


function hasBeenLikedByCurrentUser(card) {
  return card.likes.some(like => like._id === api.userId);
}

export function createCard(card, cardTemplate, renderPreviewCallback) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const heading = cardElement.querySelector(".card__heading");
  const likeCountText = cardElement.querySelector(".card__likes-count-text");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  // set heading
  heading.textContent = card.name;

  // set image
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardImage.addEventListener("click", () => renderPreviewCallback(card.name, card.link));

  // set like count text
  likeCountText.textContent = card.likes.length;

  // set like button state
  if (hasBeenLikedByCurrentUser(card)) {
    likeButton.classList.add("card__like-button_active");
  }

  // set event listener for like button
  likeButton.addEventListener("click", (evt) => {
    const isLiked = evt.target.classList.contains("card__like-button_active");
    if (isLiked) {
      api.unsetLike(card._id)
        .then(data => {
          likeCountText.textContent = data.likes.length;
        })
        .catch(api.handleError);
    } else {
      api.setLike(card._id)
        .then(data => {
          likeCountText.textContent = data.likes.length;
        })
        .catch(api.handleError);
    }

    // toggle like button state
    evt.target.classList.toggle("card__like-button_active");
  });

  // hide delete button if card is not from current user
  const cardOwnerId = card.owner._id;
  if (api.userId !== cardOwnerId) {
    deleteButton.classList.add("card__delete-button_hidden");
  }

  // add delete button event listener
  deleteButton.addEventListener("click", () => api.deleteCard(card._id)
    .then(() => cardElement.remove()) // remove card from HTML
    .catch(err => console.log(`Ошибка ${err.status}`)));

  return cardElement;
}


