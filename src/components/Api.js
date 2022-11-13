export default class Api {
  constructor(config) {
    this._config = config;
  }

  handleError(err) {
    if (err.status) {
      console.warn(`Ошибка ${err.status}`);
    } else {
      console.warn("Неизвестная ошибка");
    }
  }

  _getData(path, method = "GET", body = null) {
    const params = {
      method: method,
      headers: this._config.headers
    };

    if (body) {
      params.body = JSON.stringify(body);
    }

    return fetch(`${this._config.baseUrl}/${path}`, params)
      .then(res => {
        if (res.ok) return res.json();
        return Promise.reject(res);
      });
  }

  getUserInfo() {
    return this._getData("users/me");
  }

  getInitialCards() {
    return this._getData("cards");
  }

  setUserInfo(name, about) {
    return this._getData("users/me", "PATCH", { name: name, about: about });
  }

  createCard(name, link) {
    return this._getData("cards", "POST", { name: name, link: link });
  }

  deleteCard(id) {
    return this._getData(`cards/${id}`, "DELETE");
  }

  setLike(id) {
    return this._getData(`cards/likes/${id}`, "PUT");
  }

  unsetLike(id) {
    return this._getData(`cards/likes/${id}`, "DELETE");
  }

  setAvatar(link) {
    return this._getData("users/me/avatar", "PATCH", { avatar: link });
  }
}
