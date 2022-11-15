export default class UserInfo {
  constructor({ profileNameSelector, profileAboutSelector, profileAvatarSelector }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileAbout = document.querySelector(profileAboutSelector);
    this._profileAvatar = document.querySelector(profileAvatarSelector);
    this.userId = null;
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileAbout.textContent
    }
  }

  setUserInfo({ name, about, avatar, _id }) {
   this._profileName.textContent = name;
   this._profileAbout.textContent = about;
   this._profileAvatar.src = avatar;
   this.userId = _id;
  }
}
