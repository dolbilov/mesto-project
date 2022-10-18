'use strict';

import { closePopup } from "./modal";
import { cardsData } from "./data";

function deleteCard(evt) {
  const card = evt.target.closest('.card');
  card.remove();
}

export function createCard(name, link, cardTemplate, renderCardPopupCallback) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__heading").textContent = name;

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = link;
  cardImage.alt = name;
  cardImage.addEventListener("click", () => renderCardPopupCallback(name, link));

  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", (evt) => {
      evt.target.classList.toggle("card__like-button_active");
    });

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);

  return cardElement;
}

export function addCard(evt, cardHeadingInput, cardLinkInput, cardsContainer, cardPopup, cardTemplate, renderCardPopupCallback) {
  evt.preventDefault();

  const tempCard = createCard(cardHeadingInput.value, cardLinkInput.value, cardTemplate, renderCardPopupCallback);
  cardsContainer.prepend(tempCard);

  // Clear form inputs
  cardHeadingInput.value = "";
  cardLinkInput.value = "";

  closePopup(cardPopup);
}

export function renderCards(cardsContainer, cardTemplate, renderCardPopupCallback) {
  cardsData.forEach((item) => {
      const tempCard = createCard(item.name, item.link, cardTemplate, renderCardPopupCallback);
      cardsContainer.prepend(tempCard);
    }
  );
}

