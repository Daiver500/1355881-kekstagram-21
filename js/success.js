"use strict";

const main = document.querySelector(`main`);
const onSuccessUpload = document.querySelector(`#success`)
  .content
  .querySelector(`.success`);

const successElement = onSuccessUpload.cloneNode(true);
const successInner = successElement.querySelector(`.success__inner`);
const successButton = successElement.querySelector(`.success__button`);
const closeModal = window.popup.closeModal;

const createSuccessModule = function () {
  closeModal();
  main.insertAdjacentElement(`afterbegin`, successElement);
  successButton.addEventListener(`click`, successButtonClickHandler);
  document.addEventListener(`click`, successWindowClickHandler);
  document.addEventListener(`keydown`, escPressHandler);
};

const deleteSuccessModule = function () {
  successButton.removeEventListener(`click`, successButtonClickHandler);
  document.removeEventListener(`click`, successWindowClickHandler);
  document.removeEventListener(`keydown`, escPressHandler);
  main.removeChild(successElement);
};

const successButtonClickHandler = function () {
  deleteSuccessModule();
};

const successWindowClickHandler = function (evt) {
  if (evt.target !== successInner) {
    deleteSuccessModule();
  }
};

const escPressHandler = function (evt) {
  if (evt.key === `Escape`) {
    deleteSuccessModule();
  }
};

const fortunateUploadHandler = function () {
  createSuccessModule();
};

window.success = {
  fortunateUploadHandler,
};
