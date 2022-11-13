export default class UserInfo {
  constructor({ profileNameSelector, profileAboutSelector, profileAvatarSelector }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileAbout = document.querySelector(profileAboutSelector);
    this._profileAvatar = document.querySelector(profileAvatarSelector);
  }

  getUserInfo(getUserInfoCallback) {
    return getUserInfoCallback();
  }

  setUserInfo({ name, about, avatar }, api) {
    api.setUserInfo(name, about)
      .then((data) => {
        this._profileName.textContent = data.name;
        this._profileAbout.textContent = data.about;
      });
    api.setAvatar(avatar)
      .then((data) => {
        this._profileAvatar.src = data.avatar;
    });
  }
}
