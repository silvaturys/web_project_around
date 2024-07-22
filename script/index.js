import Card from "./card.js";

import FormValidator from "./formValidator.js";

import { openPopup, closePopup, openAddPost, closeAddPost } from "./utils.js";

//formulário edit profile

const editProfileForm = document.querySelector("#addProfile");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = document.querySelector("#name");
  const aboutInput = document.querySelector("#area");

  const nameValue = nameInput.value;
  const aboutValue = aboutInput.value;

  const profileName = document.querySelector(".profile__name");
  const profileAbout = document.querySelector(".profile__area");

  profileName.textContent = nameValue;
  profileAbout.textContent = aboutValue;

  closePopup();

  nameInput.value = "";
  aboutInput.value = "";

  const profileFormValidator = new FormValidator(
    validationSettings,
    editProfileForm
  );
  profileFormValidator.enableValidation();
}

editProfileForm.addEventListener("submit", handleProfileFormSubmit);

// Formulário de adicionar post
const addPostFormElement = document.querySelector("#AddPostForm");

function handleAddPostFormSubmit(evt) {
  evt.preventDefault();

  const titleInput = document.querySelector("#title");
  const linkInput = document.querySelector("#image-link");

  const titleValue = titleInput.value;
  const linkValue = linkInput.value;

  const newCardData = {
    name: titleValue,
    link: linkValue,
  };

  const card = new Card(newCardData, "#elements-template");
  const cardElement = card.generateCard();
  document.querySelector(".elements").prepend(cardElement);

  titleInput.value = "";
  linkInput.value = "";

  closeAddPost();

  const addPostFormValidator = new FormValidator(
    validationSettings,
    addPostFormElement
  );
  addPostFormValidator.enableValidation();
}

addPostFormElement.addEventListener("submit", handleAddPostFormSubmit);

//initial posts

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

initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#elements-template");
  const cardElement = card.generateCard();
  document.querySelector(".elements").prepend(cardElement);
});

const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__error_visible",
};

const forms = Array.from(
  document.querySelectorAll(validationSettings.formSelector)
);
forms.forEach((formElement) => {
  const validator = new FormValidator(validationSettings, formElement);
  validator.enableValidation();
});