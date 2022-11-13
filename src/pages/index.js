// need this string for hot reload of webpack-dev-server
import "../index.html";
import "./index.css";

import FormValidator from "../components/FormValidator";
import * as constants from "../utils/constants";
import Api from "../components/Api";
import UserInfo from "../components/UserInfo";
import Card from "../components/Card";
import Section from "../components/Section";
import { profileAvatarSelector } from "../utils/constants";

let userInfo;
const api = new Api(constants.config);
// const profileFormValidator = new FormValidator(constants.selectors, constants.profilePopupForm);
// const newCardFormValidator = new FormValidator(constants.selectors, constants.newCardPopupForm);
// const avatarFormValidator = new FormValidator(constants.selectors, constants.newCardPopupForm);


Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(data => {
    const [profileInfo, cardsInfo] = data;

    // set profile info
    userInfo = new UserInfo({
      profileNameSelector: constants.profileNameSelector,
      profileAboutSelector: constants.profileDescriptionSelector,
      profileAvatarSelector: constants.profileAvatarSelector
    });
    userInfo.setUserInfo(profileInfo, api);


    // set cards info
    const section = new Section({
        items: cardsInfo,
        renderer: (item) => {
          const card = new Card(item, "#card", () => {
          });
          const cardElement = card.generate();
          section.addItem(cardElement);
        }
      },
      constants.cardsContainerSelector
    );
    section.renderItems();
  })
  .catch(api.handleError);

// // Enable validation
// profileFormValidator.enableValidation();
// newCardFormValidator.enableValidation();
// avatarFormValidator.enableValidation();

// function saveProfilePopup(evt) {
//   evt.preventDefault();
//
//   constants.profilePopupSubmitButton.textContent = "Сохранение...";
//
//   api.updateProfileInfo(constants.profilePopupNameInput.value, constants.profilePopupAboutInput.value)
//     .then(data => {
//       constants.profileName.textContent = data.name;
//       constants.profileDescription.textContent = data.about;
//       this._close();
//     })
//     .catch(err => console.warn(`Ошибка ${err.status}`))
//     .finally(() => setTimeout(() => profilePopupSubmitButton.textContent = "Сохранить", timeoutDelay));
// }

// // Profile popup listeners
// profileEditButton.addEventListener("click", renderProfilePopup);
// profilePopupForm.addEventListener("submit", saveProfilePopup);
//
//
// // New card popup functions
// function renderNewCardPopup() {
//   // Clear fields
//   newCardPopupForm.reset();
//
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
// function saveNewCardPopup(evt) {
//   evt.preventDefault();
//
//   newCardPopupSubmitButton.textContent = "Создание...";
//
//   api.createCard(newCardPopupHeadingInput.value, newCardPopupLinkInput.value)
//     .then(data => {
//       const tempCard = cards.createCard(data, cardTemplate, renderPreviewPopup, deleteCardPopup);
//       cardsContainer.prepend(tempCard);
//
//       closePopup(newCardPopup);
//     })
//     .catch(api.handleError)
//     .finally(() => setTimeout(() => newCardPopupSubmitButton.textContent = "Создать", timeoutDelay));
// }
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
