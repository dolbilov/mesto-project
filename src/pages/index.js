// need this string for hot reload of webpack-dev-server
import "../index.html";
import "./index.css";

import FormValidator from "../components/FormValidator";
import ProfilePopup from "../components/ProfilePopup";
import NewCardPopup from "../components/NewCardPopup";
import AvatarPopup from "../components/AvatarPopup";
import PreviewPopup from "../components/PreviewPopup";
import * as constants from "../utils/constants";
import Api from "../components/Api";
import UserInfo from "../components/UserInfo";
import Card from "../components/Card";
import Section from "../components/Section";

let userInfo;
const api = new Api(constants.config);
// const profileFormValidator = new FormValidator('');
// const newCardFormValidator = new FormValidator('');
// const avatarFormValidator = new FormValidator('');
//const profilePopup = new ProfilePopup(constants.profilePopup, profileFormValidator);


Promise.all([api.getProfileData(), api.getInitialCards()])
  .then(data => {
    const [profileInfo, cardsInfo] = data;

    // set profile info
    userInfo = new UserInfo(profileInfo._id);
    userInfo.updateUserInfo({
        name: profileInfo.name,
        about: profileInfo.about,
        avatar: profileInfo.avatar
      }
    );


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


// function saveProfilePopup(evt) {
//   evt.preventDefault();
//
//   profilePopupSubmitButton.textContent = "Сохранение...";
//
//   api.updateProfileInfo(profilePopupNameInput.value, profilePopupDescriptionInput.value)
//     .then(data => {
//       profileName.textContent = data.name;
//       profileDescription.textContent = data.about;
//
//       closePopup(profilePopup);
//     })
//     .catch(err => console.log(`Ошибка ${err.status}`))
//     .finally(() => setTimeout(() => profilePopupSubmitButton.textContent = "Сохранить", timeoutDelay));
// }
//
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
//
//
// validate.enableValidation(selectors);

