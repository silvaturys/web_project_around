import "./index.css"
import Card from "../components/card.js";
import FormValidator from "../components/formValidator.js";
import Section from "../components/Section.js"
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const profileNameSelector = '.profile__name';
const profileJobSelector = '.profile__area';

// Dados iniciais
const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const userInfo = new UserInfo({
  nameSelector: profileNameSelector,
  jobSelector: profileJobSelector
});

const popupWithImage = new PopupWithImage('#PopupImage');
popupWithImage.setEventListeners();

const section = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#elements-template', () => {
      popupWithImage.open(item.name, item.link);
    });
    const cardElement = card.generateCard();
    section.addItem(cardElement);
  }
}, '.elements');

section.renderItems();

const editProfilePopup = new PopupWithForm('#editProfilePopup', (data) => {
  userInfo.setUserInfo({
    name: data.name,
    job: data.area
  });
});

editProfilePopup.setEventListeners();

document.querySelector('.profile__edit-button').addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  document.querySelector('#name').value = userData.name;
  document.querySelector('#area').value = userData.job;
  editProfilePopup.open();
});

const addPostPopup = new PopupWithForm('#addPostPopup', (data) => {
  const cardData = {
    name: data.title,
    link: data['image-link']
  };
  const card = new Card(cardData, '#elements-template', () => {
    popupWithImage.open(cardData.name, cardData.link);
  });
  const cardElement = card.generateCard();
  section.addItem(cardElement);
});

addPostPopup.setEventListeners();

document.querySelector('.profile__add-button').addEventListener('click', () => {
  addPostPopup.open();
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