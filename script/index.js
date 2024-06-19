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
const addClosePopup = document.querySelector("#closeAddPopupButton");

function openAddPost() {
  addPostPopup.classList.add("popup_opened");
}

function closeAddPost() {
  addPostPopup.classList.remove("popup_opened");
}

addPost.addEventListener("click", openAddPost);
addClosePopup.addEventListener("click", closeAddPost);



const addPostFormElement = document.querySelector("#addPostForm");

function handleAddPostFormSubmit(evt) {
  evt.preventDefault();

  const titleInput = document.querySelector("#title");
  const imageInput = document.querySelector("#image");

  const titleValue = titleInput.value;
  const imageValue = imageInput.value;

  const newCard = {
    name: titleValue,
    image: imageValue,
  };

  addElements(newCard);

  titleInput.value = "";
  imageInput.value = "";

  closeAddPost();
}
