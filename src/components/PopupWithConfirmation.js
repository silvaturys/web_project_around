import Popup from "../components/popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirmation) {
    super(popupSelector);
    this._handleConfirmation = handleConfirmation;
    this._formElement = document.querySelector("#popupFormConfirmation");
    this.cardId = "";

  }

  setEventListeners() {
    super.setEventListeners();
    document.querySelector("#popupFormConfirmation").addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleConfirmation(this.cardId);
      super.close();
    });
  }

  open(cardId) {
    this.cardId = cardId;
    super.open();
  }

  close() {
    super.close();
  }
}