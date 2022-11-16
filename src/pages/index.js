// need this string for hot reload of webpack-dev-server
import "../index.html";
import "./index.css";

import FormValidator from "../components/FormValidator";
import * as constants from "../utils/constants";
import Api from "../components/Api";
import UserInfo from "../components/UserInfo";
import Card from "../components/Card";
import Section from "../components/Section";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";

let userInfo;
let section;
const api = new Api(constants.config);


const createCard = (cardObject) => {
  const card = new Card(cardObject, "#card", userInfo.userId, {
    handleImageClick: (data) => {
      previewPopup.open(data);
    },
    handleLikeClick: (isLikedByUser, cardID) => {
      if (isLikedByUser) {
        api
          .unsetLike(cardID)
          .then(data => {
            card.setupLike(data);
          })
          .catch(api.handleError);
      } else {
        api
          .setLike(cardID)
          .then(data => {
            card.setupLike(data);
          })
          .catch(api.handleError);
      }
    },
    handleDeleteClick: (cardElement, cardID) => {
      api
        .deleteCard(cardID)
        .then(() => cardElement.remove())
        .catch(api.handleError);
    }
  });

  return card.generate();
};

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(data => {
    const [profileInfo, cardsInfo] = data;

    // set profile info
    userInfo = new UserInfo({
      profileNameSelector: constants.profileNameSelector,
      profileAboutSelector: constants.profileDescriptionSelector,
      profileAvatarSelector: constants.profileAvatarSelector
    });
    userInfo.setUserInfo(profileInfo);


    // set cards info
    section = new Section({
        items: cardsInfo,
        renderer: (item) => {
          const cardElement = createCard(item);
          section.addItem(cardElement);
        }
      },
      constants.cardsContainerSelector
    );
    section.renderItems();
  })
  .catch(api.handleError);


// Profile popup
const profilePopup = new PopupWithForm(constants.profilePopupSelector, (evt) => {
  evt.preventDefault();
  profilePopup.renderLoading(true);

  api
    .setUserInfo(
      constants.profilePopupNameInput.value,
      constants.profilePopupAboutInput.value
    )
    .then(data => {
      userInfo.setUserInfo(data);
      profilePopup.close();
    })
    .catch(api.handleError)
    .finally(() => setTimeout(() => profilePopup.renderLoading(false), 1000));
});
profilePopup.setEventListeners();
constants.profileEditButton.addEventListener("click", () => {
  profilePopup.setInputValues(userInfo.getUserInfo());
  profileFormValidator.hideAllInputsErrors();
  profileFormValidator.toggleButtonState();
  profilePopup.open();

});


// New card popup
const newCardPopup = new PopupWithForm(constants.newCardPopupSelector, (evt) => {
  evt.preventDefault();
  newCardPopup.renderLoading(true, "Создание...");
  api
    .createCard(
      constants.newCardPopupHeadingInput.value,
      constants.newCardPopupLinkInput.value)
    .then((data) => {
      const cardElement = createCard(data);
      section.addItem(cardElement);
      newCardPopup.close();
    })
    //.catch(api.handleError)
    .finally(() => setTimeout(() => newCardPopup.renderLoading(false), 1000));
});
newCardPopup.setEventListeners();
constants.addButton.addEventListener("click", () => {
  newCardFormValidator.hideAllInputsErrors();
  newCardFormValidator.toggleButtonState();
  newCardPopup.open();
});


// Avatar popup
const avatarPopup = new PopupWithForm(constants.avatarPopupSelector, (evt) => {
  evt.preventDefault();
  avatarPopup.renderLoading(true);
  api
    .setAvatar(constants.newAvatarLinkInput.value)
    .then(data => {
      constants.profileAvatar.src = data.avatar;
      avatarPopup.close();
    })
    .catch(api.handleError)
    .finally(() => setTimeout(() => {
      avatarPopup.renderLoading(false);
    }, 1000));
});
avatarPopup.setEventListeners();
constants.profileAvatarContainer.addEventListener("click", () => {
  avatarFormValidator.hideAllInputsErrors();
  avatarFormValidator.toggleButtonState();
  avatarPopup.open();
});


// Preview popup
const previewPopup = new PopupWithImage(constants.previewPopupSelector);
previewPopup.setEventListeners();


// Enable validation
const profileFormValidator = new FormValidator(constants.selectors, constants.profilePopupForm);
const newCardFormValidator = new FormValidator(constants.selectors, constants.newCardPopupForm);
const avatarFormValidator = new FormValidator(constants.selectors, constants.avatarForm);

profileFormValidator.enableValidation();
newCardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

