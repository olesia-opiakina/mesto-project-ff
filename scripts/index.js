// @todo: Темплейт карточки
const template = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(card) {
  const cardElement = template.querySelector(".places__item").cloneNode(true);
  cardElement.querySelector(".card__title").textContent = card.name;
  cardElement.querySelector(".card__image").src = card.link;
  return cardElement;
}

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

initialCards.forEach(function (item) {
  const newCard = createCard(item);
  cardList.append(newCard);
});
