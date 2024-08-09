export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;

    // popup de imagem
    this._popupImage = document.querySelector(".popup__image");
    this._popupParagraph = document.querySelector(".popup__paragraph");
    this._openPopupImage = document.querySelector("#PopupImage");
    this._closePopupImage = document.querySelector("#CloseImagePopup");
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardTemplate;
  }

  _setCardData() {
    this._cardElement.querySelector(".element__image").src = this._link;
    this._cardElement.querySelector(".element__image").alt = this._name;
    this._cardElement.querySelector(".element__text").textContent = this._name;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".element__icon")
      .addEventListener("click", () => {
        this._toggleLike();
      });
    this._cardElement
      .querySelector(".element__icon-trash")
      .addEventListener("click", () => {
        this._deleteCard();
      });
    this._cardElement
      .querySelector(".element__image")
      .addEventListener("click", (evt) => {
        this._openImage(evt);
      });

    this._closePopupImage.addEventListener("click", () => this._closeImage());

    this._openPopupImage.addEventListener("click", (evt) => {
      if (evt.target === this._openPopupImage) {
        this._closeImage();
      }
    });

    document.addEventListener("keydown", (evt) => {
      if (evt.key === "Escape") {
        const openedImage = document.querySelector(".popup__image_opened");
        if (openedImage) {
          this._closeImage();
        }
      }
    });
  }

  _toggleLike() {
    this._cardElement
      .querySelector(".element__icon")
      .classList.toggle("elements__icon-active");
  }

  _deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _openImage(evt) {
    const card = evt.target.closest(".element");
    const image = card.querySelector(".element__image");
    const paragraph = card.querySelector(".element__text");
    this._popupImage.src = image.src;
    this._popupImage.alt = image.alt;
    this._popupParagraph.textContent = paragraph.textContent;
    this._openPopupImage.classList.add("popup__image_opened");
  }

  _closeImage() {
    this._openPopupImage.classList.remove("popup__image_opened");
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._setCardData();
    this._setEventListeners();
    return this._cardElement;
  }
}