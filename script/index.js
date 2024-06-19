const editProfile = document.querySelector(".profile__edit-button");
const popupOpen = document.querySelector("#editProfilePopup");
const popupClose = document.querySelector("#closePopupButton");

function openPopup() {
  popupOpen.classList.add("popup_opened");
}

function closePopup() {
  popupOpen.classList.remove("popup_opened");
}

editProfile.addEventListener("click", openPopup);
popupClose.addEventListener("click", closePopup);



const formElement = document.querySelector(".popup__form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = document.querySelector("#name");
  const areaInput = document.querySelector("#area");

  const nameValue = nameInput.value;
  const areaValue = areaInput.value;

  const profileName = document.querySelector(".profile__name");
  const profileArea = document.querySelector(".profile__area");

  profileName.textContent = nameValue;
  profileArea.textContent = areaValue;

  closePopup();
}

formElement.addEventListener("submit", handleProfileFormSubmit);


const addPost = document.querySelector(".profile__add-button");
const addPostPopup = document.querySelector("#addPostPopup");
const addClosePopup = document.querySelector("#CloseAddPopup");

function openAddPost() {
  addPostPopup.classList.add("popup_opened");
}

function closeAddPost() {
  addPostPopup.classList.remove("popup_opened");
}

addPost.addEventListener("click", openAddPost);
addClosePopup.addEventListener("click", closeAddPost);



const addPostFormElement = document.querySelector("#AddPostForm");

function handleAddPostFormSubmit(evt) {
  evt.preventDefault();

  const titleInput = document.querySelector("#title");
  const linkInput = document.querySelector("#image-link");

  const titleValue = titleInput.value;
  const linkValue = linkInput.value;

  const newCard = {
    name: titleValue,
    link: linkValue,
  };

  addElements(newCard);

  titleInput.value = "";
  imageInput.value = "";

  closeAddPost();
}

addPostFormElement.addEventListener("submit", handleAddPostFormSubmit);

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

function addElements(elemento) {
  const elementsTemplate = document.querySelector("#elements-template").content;
  const templatePosts = elementsTemplate.cloneNode(true);
  const elementsPhoto = templatePosts.querySelector(".element__image");
  const elementsText = templatePosts.querySelector(".element__text");

  elementsPhoto.src = elemento.link;
  elementsPhoto.alt = elemento.name;
  elementsText.textContent = elemento.name;

  elementsPhoto.addEventListener("click", (evt) => openImage(evt));

  const likeButtonActive = templatePosts.querySelector(".element__icon");
  likeButtonActive.addEventListener("click", function (evt) {
    evt.target.classList.toggle("elements__icon-active");
  });

  const deletePost = templatePosts.querySelector(".element__icon-trash");

  deletePost.addEventListener("click", function () {
    const removePost = deletePost.closest(".element");
    removePost.remove();
  });

  const elementsList = document.querySelector(".elements");
  elementsList.prepend(templatePosts);
}

initialCards.forEach(addElements);

const popupImage = document.querySelector(".popup__image");
const popupParagraph = document.querySelector(".popup__paragraph");
const openPopupImage = document.querySelector("#PopupImage");
const closePopupImage = document.querySelector("#CloseImagePopup");

//funções open image

function openImage(evt) {
  const card = evt.target.offsetParent;
  const image = card.querySelector(".element__image");
  const paragraph = card.querySelector(".element__text");
  popupImage.src = image.src;
  popupImage.alt = image.alt;
  popupParagraph.textContent = paragraph.textContent;
  openPopupImage.classList.add("popup__image_opened");
}

function closeImage() {
  openPopupImage.classList.remove("popup__image_opened");
}

//eventos open image

closePopupImage.addEventListener("click", closeImage);
