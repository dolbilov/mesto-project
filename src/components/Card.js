export default class Card {
  constructor(cardObject, selector, userId, { handleImageClick, handleLikeClick, handleDeleteClick }) {
    this._id = cardObject._id;
    this._likes = cardObject.likes;
    this._link = cardObject.link;
    this._name = cardObject.name;
    this._ownerId = cardObject.owner._id;

    this._userId = userId;

    this._selector = selector;

    this._handleImageClick = handleImageClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;

    // card content
    this._element = this._getElement();
    this._heading = this._element.querySelector(".card__heading");
    this._cardImage = this._element.querySelector(".card__image");
    this._likeCountText = this._element.querySelector(".card__likes-count-text");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
  }

  removeCard(cardItem) {
    cardItem.remove();
  }

  setupLike() {
    this._likeCountText.textContent = this._likes.length;
    if (this._isLikedByUser()) {
      this._likeButton.classList.add("card__like-button_active"); // TODO: is it work?
    }

    this._likeButton.addEventListener("click", () => this._handleLikeClick(this._id));
  }

  setupDeleteButton() {
    if (this._ownerId === this._userId) {
      this._deleteButton.addEventListener("click", () => this._handleDeleteClick(this._id));
    } else {
      this._deleteButton.classList.add("card__delete-button_hidden");
    }
  }

  _isLikedByUser() {
    return this._likes.some(like => like._id === this._userId);
  }

  _getElement() {
    return document
      .querySelector(this._selector)
      .content
      .querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", this._handleImageClick);
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this._id).then((data) => {
        //this._likes = data.likes;
      });

      this._likeButton.classList.toggle("card__like-button_active");
    });
    this._deleteButton.addEventListener("click", this._handleDeleteClick);
  }

  generate() {
    this._heading.textContent = this._name;

    // setup image
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this.setupLike();
    this.setupDeleteButton();
    this._setEventListeners();

    return this._element;
  }
}
