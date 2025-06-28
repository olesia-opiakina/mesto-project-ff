import "./pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, deleteCard, handleCardLike } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";

const cardList = document.querySelector(".places__list");

initialCards.forEach(function (item) {
  const newCard = createCard(item, deleteCard, handleCardLike, openImage);
  cardList.append(newCard);
});

const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.getElementById("edit-dialog");
const addButton = document.querySelector(".profile__add-button");
const addPopup = document.getElementById("add-dialog");
const closeEditButton = document.getElementById("closeEditButton");
const closeAddButton = document.getElementById("closeAddButton");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
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

function handleOpenAdd() {
  openModal(addPopup);
}
addButton.addEventListener("click", handleOpenAdd);

function handleCloseEdit() {
  closeModal(editPopup);
}

closeEditButton.addEventListener("click", handleCloseEdit);

function handleCloseAdd() {
  closeModal(addPopup);
}

closeAddButton.addEventListener("click", handleCloseAdd);

function handleEditProfile() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editPopup);
}

editButton.addEventListener("click", handleEditProfile);

function handleFormSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editPopup);
}

editForm.addEventListener("submit", handleFormSubmit);

function addNewCard(event) {
  event.preventDefault();
  const card = {
    name: placeInput.value,
    link: linkInput.value,
  };
  const cardElement = createCard(card, deleteCard, handleCardLike, openImage);
  cardList.prepend(cardElement);
  closeModal(addPopup);
  event.target.reset();
}

addForm.addEventListener("submit", addNewCard);

function openImage(name, link) {
  bigImagePopup.src = link;
  bigImagePopup.alt = name;
  captionImagePopup.textContent = name;
  openModal(imagePopup);
}

function handleCloseImage() {
  closeModal(imagePopup);
}

closeImageButton.addEventListener("click", handleCloseImage);
