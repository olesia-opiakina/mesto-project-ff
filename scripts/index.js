// @todo: Темплейт карточки
const template = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(card) {
  const cardElement = template.querySelector(".places__item").cloneNode(true);
  cardElement.querySelector(".card__title").textContent = card.name;
  cardElement.querySelector(".card__image").src = card.link;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);
  return cardElement;
}

// @todo: Функция удаления карточки

function deleteCard(event) {
  const cardElement = event.target.closest(".places__item");
  cardElement.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach(function (item) {
  const newCard = createCard(item);
  cardList.append(newCard);
});
