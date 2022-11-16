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
    handleImageClick: () => {

    },
    handleLikeClick: () => {

    },
    handleDeleteClick: (cardElement, cardID) => {
      api
        .deleteCard(cardID)
        .then(data => {
          cardElement.remove();
        })
        .catch(api.handleError);
    }
  });

  return card.generate();
}

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


// Popups
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

const avatarPopup = new PopupWithForm(constants.avatarPopupSelector, (evt) => {
  evt.preventDefault();
  this.renderLoading(true);
});

const previewPopup = new PopupWithImage(constants.previewPopupSelector);

// Set event listeners
profilePopup.setEventListeners();
constants.profileEditButton.addEventListener("click", () => {
  profilePopup.setInputValues(userInfo.getUserInfo());
  profilePopup.open();
});

newCardPopup.setEventListeners();
constants.addButton.addEventListener("click", () => newCardPopup.open());

// Enable validation
// const profileFormValidator = new FormValidator(constants.selectors, constants.profilePopupForm);
// const newCardFormValidator = new FormValidator(constants.selectors, constants.newCardPopupForm);
// const avatarFormValidator = new FormValidator(constants.selectors, constants.newCardPopupForm);

// profileFormValidator.enableValidation();
// newCardFormValidator.enableValidation();
// avatarFormValidator.enableValidation();


// // New card popup functions
// function renderNewCardPopup() {
//   // Clear all errors
//   validate.hideAllInputsError(newCardPopupForm, selectors);
//
//   // Toggle submit button state
//   validate.toggleButtonState(
//     [newCardPopupHeadingInput, newCardPopupLinkInput],
//     newCardPopupSubmitButton,
//     selectors
//   );
//
//   openPopup(newCardPopup);
// }
//
//
// // New card popup listeners
// addButton.addEventListener("click", renderNewCardPopup);
// newCardPopupForm.addEventListener("submit", saveNewCardPopup);
//
//
// // Preview popup
// function renderPreviewPopup(name, link) {
//   previewPopupImage.src = link;
//   previewPopupImage.alt = name;
//   previewPopupHeading.textContent = name;
//
//   openPopup(previewPopup);
// }
//
//
// // Avatar popup functions
// function renderProfileAvatarPopup() {
//   // Clear fields
//   avatarForm.reset();
//
//   // Clear all errors
//   validate.hideAllInputsError(avatarForm, selectors);
//
//   validate.toggleButtonState([newAvatarLinkInput], avatarPopupSubmitButton, selectors);
//
//   openPopup(avatarPopup);
// }
//
// function saveProfileAvatarPopup(evt) {
//   evt.preventDefault();
//
//   avatarPopupSubmitButton.textContent = "Сохранение...";
//
//   const newLink = newAvatarLinkInput.value;
//   api.updateAvatar(newLink)
//     .then(data => {
//       profileAvatar.src = data.avatar;
//       closePopup(avatarPopup);
//     })
//     .catch(api.handleError)
//     .finally(() => {
//       setTimeout(() => avatarPopupSubmitButton.textContent = "Сохранить", timeoutDelay);
//     });
// }
//
// // Avatar popup event listeners
// profileAvatarContainer.addEventListener("click", renderProfileAvatarPopup);
// avatarForm.addEventListener("submit", saveProfileAvatarPopup);
//
//
// // Delete card popup
// deleteCardPopup.addEventListener("submit", (evt) => {
//   evt.preventDefault();
//
//   deleteCardAfterConfirm();
// });
