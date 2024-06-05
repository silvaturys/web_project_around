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
