export default class Card {
  constructor(cardObject, selector, handleCardClick) {
    this._name = cardObject.name;
    this._link = cardObject.link;
    this._likes = cardObject.likes;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
  }

  _getElement() {
    return document
      .querySelector(this._selector)
      .content
      .querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {

  }

  generate() {
    const cardElement = this._getElement();

    const heading = cardElement.querySelector(".card__heading");
    const cardImage = cardElement.querySelector(".card__image");
    const likeCountText = cardElement.querySelector(".card__likes-count-text");
    const likeButton = cardElement.querySelector(".card__like-button");
    const deleteButton = cardElement.querySelector(".card__delete-button");

    // setup heading
    heading.textContent = this._name;

    // setup image
    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardImage.addEventListener("click", this._handleCardClick);

    // setup likes count
    likeCountText.textContent = this._likes.length;

    return cardElement;
  }
}
