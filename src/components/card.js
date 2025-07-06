import { addLike, deleteLike } from "../api.js";
const template = document.querySelector("#card-template").content;

export function createCard(
  cardData,
  handleDeleteClick,
  handleCardLike,
  openImage,
  currentUserId
) {
  const cardElement = template.querySelector(".places__item").cloneNode(true);
  cardElement.querySelector(".card__title").textContent = cardData.name;

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardImage.addEventListener("click", function () {
    openImage(cardData.name, cardData.link);
  });

  const deleteButton = cardElement.querySelector(".card__delete-button");
  if (cardData.owner._id === currentUserId) {
    deleteButton.addEventListener("click", () => {
      handleDeleteClick(cardData._id, cardElement);
    });
  } else {
    deleteButton.style.display = "none";
  }

  const likeButton = cardElement.querySelector(".card__like-button");
  const likeNumber = cardElement.querySelector(".card__like-number");
  if (cardData.likes.some((user) => user._id === currentUserId)) {
    likeButton.classList.add("card__like-button_is-active");
  }
  likeNumber.textContent = cardData.likes.length;
  likeButton.addEventListener("click", function () {
    handleCardLike(likeButton, cardData, likeNumber);
  });
  return cardElement;
}

export function handleCardLike(likeButton, cardData, likeNumber) {
  const cardId = cardData._id;
  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  const likeMethod = isLiked ? deleteLike : addLike;
  console.log(isLiked ? "Удаляем лайк" : "Добавляем лайк");
  likeMethod(cardId)
    .then((resultCard) => {
      likeButton.classList.toggle("card__like-button_is-active");
      likeNumber.textContent = resultCard.likes.length;
      cardData.likes = resultCard.likes;
    })
    .catch((err) => console.log(err));
}
