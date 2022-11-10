import { profileName, profileDescription } from "../utils/constants";

class UserInfo {
  constructor(userId) {
    this._userId = userId;
  }

  hasUserLike = (likes) => likes.some(like => like === this._userId);

  isCreatedByUser = (ownerId) => ownerId === this._userId;

  updateUserInfo = ({ name, about }) => {
    profileName.textContent = name;
    profileDescription.textContent = about;
  }
}
