export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  _clear() {
    this._container.innerHTML = "";
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems() {
    this._clear();
    this._renderedItems.reverse().forEach(item => this._renderer(item));
  }
}
