"use strict";

const uploadImageFile = document.querySelector(`#upload-file`);
const uploadForm = document.querySelector(`.img-upload__form`);
const imageUploadOverlay = uploadForm.querySelector(`.img-upload__overlay`);
const modalCloseBtn = imageUploadOverlay.querySelector(`#upload-cancel`);
const formSubmitHandler = window.submit.formSubmitHandler;
const hashtagsInput = imageUploadOverlay.querySelector(`.text__hashtags`);
const hashtagsInputHandler = window.validation.hashtagsInputHandler;

const modalEscPressHandler = function (evt) {
  if (evt.key === `Escape`) {
    closeModal();
    evt.preventDefault();
  }
};

const openModal = function () {
  imageUploadOverlay.classList.remove(`hidden`);
  document.querySelector(`body`).classList.add(`modal-open`);
  hashtagsInput.addEventListener(`input`, hashtagsInputHandler);
  uploadForm.addEventListener(`submit`, formSubmitHandler);
  modalCloseBtn.addEventListener(`click`, modalCloseBtnClickHandler);
  document.addEventListener(`keydown`, modalEscPressHandler);
};

const closeModal = function () {
  imageUploadOverlay.classList.add(`hidden`);
  document.querySelector(`body`).classList.remove(`modal-open`);
  // uploadImageFile.value = ``;
  hashtagsInput.removeEventListener(`input`, hashtagsInputHandler);
  uploadForm.removeEventListener(`submit`, formSubmitHandler);
  modalCloseBtn.removeEventListener(`click`, modalCloseBtnClickHandler);
  document.removeEventListener(`keydown`, modalEscPressHandler);
  window.submit.resetImageData();
  uploadForm.reset();
  hashtagsInput.style.outline = ``;
  hashtagsInput.style.background = ``;
};

hashtagsInput.addEventListener(`focusin`, function () {
  document.removeEventListener(`keydown`, window.modal.modalEscPressHandler);
});

hashtagsInput.addEventListener(`focusout`, function () {
  document.addEventListener(`keydown`, window.modal.modalEscPressHandler);
});

const openModalHandler = function () {
  openModal();
};

const modalCloseBtnClickHandler = function () {
  closeModal();
};

window.modal = {
  openModalHandler,
  modalCloseBtnClickHandler,
  uploadImageFile,
  imageUploadOverlay
};

