const template = document.querySelector("#card-template").content;

const cardList = document.querySelector(".places__list");

function createCard(card, deleteCallback) {
  const cardElement = template.querySelector(".places__item").cloneNode(true);
  cardElement.querySelector(".card__title").textContent = card.name;
  cardElement.querySelector(".card__image").src = card.link;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCallback);
  return cardElement;
}

function deleteCard(event) {
  const cardElement = event.target.closest(".places__item");
  cardElement.remove();
}

initialCards.forEach(function (item) {
  const newCard = createCard(item, deleteCard);
  cardList.append(newCard);
});
