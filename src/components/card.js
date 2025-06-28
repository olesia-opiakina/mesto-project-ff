const template = document.querySelector("#card-template").content;

export function createCard(
  card,
  deleteCallback,
  handleCardLike,
  handleImageOpen,
  imageClick
) {
  const cardElement = template.querySelector(".places__item").cloneNode(true);
  cardElement.querySelector(".card__title").textContent = card.name;
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCallback);
  handleCardLike(cardElement);
  handleImageOpen(cardElement, imageClick);
  return cardElement;
}

export function deleteCard(event) {
  const cardElement = event.target.closest(".places__item");
  cardElement.remove();
}

export function handleCardLike(cardElement) {
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", function (event) {
    event.currentTarget.classList.toggle("card__like-button_is-active");
  });
}

export function handleImageOpen(cardElement, imageClick) {
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.addEventListener("click", imageClick);
}
