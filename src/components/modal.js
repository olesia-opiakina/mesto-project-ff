export function openModal(modalPopup) {
  document.addEventListener("keydown", handleEscapeKey);
  modalPopup.addEventListener("click", handleOverlay);
  modalPopup.classList.add("popup_is-opened");
}

export function closeModal(modalPopup) {
  modalPopup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscapeKey);
  modalPopup.removeEventListener("click", handleOverlay);
}

function handleEscapeKey(event) {
  if (event.key === "Escape") {
    const modalPopup = document.querySelector(".popup_is-opened");
    closeModal(modalPopup);
  }
}

export function handleOverlay(event) {
  console.log(event);
  if (event.target === event.currentTarget) {
    const modalPopup = document.querySelector(".popup_is-opened");
    closeModal(modalPopup);
  }
}
