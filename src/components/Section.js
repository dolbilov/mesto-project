export default class Section {
  /*
  @param { items, renderer }:
    items - list of data to be added;
    renderer - function that will create and draw data on the page.

  @param containerSelector - selector of container that will store elements.
   */
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  _clear() {
    this._container.innerHTML = '';
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems() {
    this._clear();
    this._renderedItems.forEach(item => this._renderer(item));
  }
}
