import Popup from './popup.js';

export default class PopupWithImage extends Popup {
  open(name, link) {
    const image = this._popup.querySelector('.popup__image');
    const caption = this._popup.querySelector('.popup__paragraph');
    image.src = link;
    image.alt = name;
    caption.textContent = name;
    super.open();
  }
}