const template = document.querySelector("#card-template").content;

export function createCard(card, deleteCallback, handleCardLike, openImage) {
  const cardElement = template.querySelector(".places__item").cloneNode(true);
  cardElement.querySelector(".card__title").textContent = card.name;
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardImage.addEventListener("click", function () {
    openImage(card.name, card.link);
  });
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCallback);
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", function () {
    handleCardLike(likeButton);
  });
  return cardElement;
}

export function deleteCard(event) {
  const cardElement = event.target.closest(".places__item");
  cardElement.remove();
}

export function handleCardLike(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}
