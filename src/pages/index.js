import "./index.css"
import Card from "../components/card.js";
import FormValidator from "../components/formValidator.js";
import Section from "../components/Section.js"
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  elementArea,
  avatarBtn,
} from "../components/utils.js"
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__area',
  avatar: '.profile__image'
});

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web-ptbr-cohort-12",
  headers: {
    authorization: "7db9390b-a3cb-46e6-82c8-7e278b7c6b08",
    "Content-Type": "application/json",
  },
});

//cards iniciais
api.getUserInfo().then((result) => {
  userInfo.setUserInfo(result);

  api.getInitialCards().then((result) => {
    const cardList = new Section(
      {
        items: result,
        renderer: (item) => {
          console.log(item);
          const cards = new Card(
            item,
            () => {
              popupPicture.handleCardClick(item.name, item.link);
            },
            userInfo._userId,
            () => {
              popupWithConfirmation.open(item._id);
            },
            () => api.addLike(item._id),
            () => api.removeLike(item._id)
          );
          const cardElement = cards.generateCard();
          cardList.addItem(cardElement);
        },
      },
      elementArea // Use o seletor CSS em vez do objeto HTMLElement
    );

    cardList.renderItems();
  });
});

// Adciona cards
const popupAddCard = new PopupWithForm("#addPostPopup", (input) => {
  console.log(input);
  if (input.link){
    api.addcards(input).then((result) => {
      const newCard = new Card(
        result,
        () => {
          popupPicture.handleCardClick(result.name, result.link);
        },

        userInfo._userId,
        () => {
          popupWithConfirmation.open(result._id);

        },

        (cardId) => api.addLike(cardId),
        (cardId) => api.removeLike(cardId)
      );
      const newCardElement = newCard.generateCard();
      elementArea.prepend(newCardElement);
      popupAddCard.close();
    });
  }

});
popupAddCard.setEventListeners();

//popup profile
const popupProfile1 = new PopupWithForm("#editProfilePopup", (inputs) => {
  api.editProfile(inputs).then((result) => {
    userInfo.setUserInfo(result);
    popupProfile1.close();
  });
});
popupProfile1.setEventListeners();

//popup Avatar
const popupAvatarProfile = new PopupWithForm(
  "#popup-avatar-profile",
  (inputs) => {
    api.editAvatarProfile(inputs).then((result) => {
      userInfo.setUserInfo(result);
      popupAvatarProfile.close();
    });
  }
);
popupAvatarProfile.setEventListeners();


const popupPicture = new PopupWithImage('#PopupImage');
popupPicture.setEventListeners();

//popup confirmation
const popupWithConfirmation = new PopupWithConfirmation(
  "#popup-delete-confirmation",
  (cardToDelete) => {
    api.deleteCard(cardToDelete).then(() => {
      popupWithConfirmation.close();
      const card = document.querySelector(`#id_${cardToDelete}`);
      if (card){
        card.remove();
      }
    });
  }
);
popupWithConfirmation.setEventListeners();


// Event edit button
document.querySelector('.profile__edit-button').addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  document.querySelector('#name').value = userData.name;
  document.querySelector('#area').value = userData.job;
  popupProfile1.open();
});

//Event avatar button
avatarBtn.addEventListener("click", function () {
  popupAvatarProfile.open();
});

//event add button
document.querySelector('.profile__add-button').addEventListener('click', () => {
  popupAddCard.open();
});

const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__error_visible",
};

const forms = Array.from(document.querySelectorAll(validationSettings.formSelector));
forms.forEach((formElement) => {
  const validator = new FormValidator(validationSettings, formElement);
  validator.enableValidation();
});