import "./pages/index.css";
import { createCard, handleCardLike } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  getInitialCards,
  getUserInformation,
  editUserInformation,
  addNewCardOnServer,
  deleteCardOnServer,
  updateUserAvatar,
} from "./api.js";

const cardList = document.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.getElementById("edit-dialog");
const addButton = document.querySelector(".profile__add-button");
const addPopup = document.getElementById("add-dialog");
const closeEditButton = document.getElementById("closeEditButton");
const closeAddButton = document.getElementById("closeAddButton");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const nameInput = editPopup.querySelector(".popup__input_type_name");
const jobInput = editPopup.querySelector(".popup__input_type_description");
const editForm = editPopup.querySelector(".popup__form");
const addForm = addPopup.querySelector(".popup__form");
const placeInput = addPopup.querySelector(".popup__input_type_card-name");
const linkInput = addPopup.querySelector(".popup__input_type_url");
const imagePopup = document.querySelector(".popup_type_image");
const bigImagePopup = imagePopup.querySelector(".popup__image");
const captionImagePopup = imagePopup.querySelector(".popup__caption");
const closeImageButton = imagePopup.querySelector(".popup__close");
const confirmButton = document.querySelector("#confirm-delete");
const confirmPopup = document.querySelector(".popup_type_confirm");
const closeConfirmButton = confirmPopup.querySelector(".popup__close");
const avatarPopup = document.querySelector("#avatar-dialog");
const avatarForm = avatarPopup.querySelector(".popup__form");
const avatarInput = avatarForm.querySelector(".popup__input_type_avatar");
const closeAvatarButton = avatarPopup.querySelector(".popup__close");
const submitEditButton = editPopup.querySelector(".popup__button");
const submitAddButton = addPopup.querySelector(".popup__button");
const submitAvatarButton = avatarPopup.querySelector(".popup__button");

const textForLoading = "Сохранение...";

let userId = null;
let idCardForDelete;
let cardForDelete;

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig);

Promise.all([getUserInformation(), getInitialCards()])
  .then(([userData, cards]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
    userId = userData._id;
    cards.forEach((card) => {
      const newCard = createCard(
        card,
        handleDeleteClick,
        handleCardLike,
        openImage,
        userId
      );
      cardList.append(newCard);
    });
  })
  .catch((err) => {
    console.log(err);
  });

function handleDeleteClick(id, card) {
  idCardForDelete = id;
  cardForDelete = card;
  openModal(confirmPopup);
}

function handleConfirmDelete() {
  deleteCardOnServer(idCardForDelete)
    .then(() => {
      cardForDelete.remove();
      closeModal(confirmPopup);
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleEditProfile() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(editForm, validationConfig);
  openModal(editPopup);
}

function addNewCard(event) {
  event.preventDefault();
  const initialText = submitAddButton.textContent;

  submitAddButton.textContent = textForLoading;

  const name = placeInput.value;
  const link = linkInput.value;

  addNewCardOnServer(name, link)
    .then((cardData) => {
      const cardElement = createCard(
        cardData,
        handleDeleteClick,
        handleCardLike,
        openImage,
        userId
      );
      cardList.prepend(cardElement);
      closeModal(addPopup);
      event.target.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitAddButton.textContent = initialText;
    });
}

function handleFormSubmit(event) {
  event.preventDefault();
  const initialText = submitEditButton.textContent;

  submitEditButton.textContent = textForLoading;

  const newName = nameInput.value;
  const newAbout = jobInput.value;

  editUserInformation(newName, newAbout)
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
      closeModal(editPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitEditButton.textContent = initialText;
    });
}

function handleAvatarSubmit(event) {
  event.preventDefault();
  const initialText = submitAvatarButton.textContent;
  submitAvatarButton.textContent = textForLoading;
  const newAvatar = avatarInput.value;
  updateUserAvatar(newAvatar)
    .then((userData) => {
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
      closeModal(avatarPopup);
    })
    .catch(console.log)
    .finally(() => {
      submitAvatarButton.textContent = initialText;
    });
}

function openImage(name, link) {
  bigImagePopup.src = link;
  bigImagePopup.alt = name;
  captionImagePopup.textContent = name;
  openModal(imagePopup);
}

function handleOpenAdd() {
  addForm.reset();
  clearValidation(addForm, validationConfig);
  openModal(addPopup);
}

function handleCloseImage() {
  closeModal(imagePopup);
}

function handleCloseEdit() {
  closeModal(editPopup);
}

function handleCloseAdd() {
  closeModal(addPopup);
}

confirmButton.addEventListener("click", handleConfirmDelete);
closeConfirmButton.addEventListener("click", function () {
  closeModal(confirmPopup);
});

addButton.addEventListener("click", handleOpenAdd);
closeEditButton.addEventListener("click", handleCloseEdit);
closeAddButton.addEventListener("click", handleCloseAdd);
editButton.addEventListener("click", handleEditProfile);
editForm.addEventListener("submit", handleFormSubmit);
addForm.addEventListener("submit", addNewCard);
closeImageButton.addEventListener("click", handleCloseImage);
profileImage.addEventListener("click", function () {
  avatarForm.reset();
  openModal(avatarPopup);
});
closeAvatarButton.addEventListener("click", function () {
  closeModal(avatarPopup);
});
avatarForm.addEventListener("submit", handleAvatarSubmit);
