"use strict";

const uploadImageFile = document.querySelector(`#upload-file`);
const uploadForm = document.querySelector(`.img-upload__form`);
const imageUploadOverlay = uploadForm.querySelector(`.img-upload__overlay`);
const modalCloseBtn = imageUploadOverlay.querySelector(`#upload-cancel`);
const formSendingHandler = window.submit.formSendingHandler;
const hashtagsInput = imageUploadOverlay.querySelector(`.text__hashtags`);
const hashtagsInputHandler = window.validation.hashtagsInputHandler;
const commentsInput = imageUploadOverlay.querySelector(`.text__description`);
const commentsInputHandler = window.validation.commentsInputHandler;

const modalEscPressHandler = (evt) => {
  if (evt.key === `Escape`) {
    closeModal();
    evt.preventDefault();
  }
};

const openModal = () => {
  imageUploadOverlay.classList.remove(`hidden`);
  document.querySelector(`body`).classList.add(`modal-open`);
  hashtagsInput.addEventListener(`input`, hashtagsInputHandler);
  hashtagsInput.addEventListener(`focusin`, hashtagFocusInHandler);
  hashtagsInput.addEventListener(`focusout`, hashtagFocusOutHandler);
  commentsInput.addEventListener(`input`, commentsInputHandler);
  commentsInput.addEventListener(`focusin`, commentsFocusInHandler);
  commentsInput.addEventListener(`focusout`, commentsFocusOutHandler);
  uploadForm.addEventListener(`submit`, formSendingHandler);
  modalCloseBtn.addEventListener(`click`, modalCloseBtnClickHandler);
  document.addEventListener(`keydown`, modalEscPressHandler);
};

const closeModal = () => {
  imageUploadOverlay.classList.add(`hidden`);
  document.querySelector(`body`).classList.remove(`modal-open`);
  hashtagsInput.removeEventListener(`input`, hashtagsInputHandler);
  hashtagsInput.removeEventListener(`focusin`, hashtagFocusInHandler);
  hashtagsInput.removeEventListener(`focusout`, hashtagFocusOutHandler);
  commentsInput.removeEventListener(`input`, commentsInputHandler);
  commentsInput.removeEventListener(`focusin`, commentsFocusInHandler);
  commentsInput.removeEventListener(`focusout`, commentsFocusOutHandler);
  uploadForm.removeEventListener(`submit`, formSendingHandler);
  modalCloseBtn.removeEventListener(`click`, modalCloseBtnClickHandler);
  document.removeEventListener(`keydown`, modalEscPressHandler);
  window.submit.resetImageData();
  uploadForm.reset();
  hashtagsInput.style.outline = ``;
  hashtagsInput.style.background = ``;
};

const hashtagFocusInHandler = () => {
  document.removeEventListener(`keydown`, modalEscPressHandler);
};

const hashtagFocusOutHandler = () => {
  document.addEventListener(`keydown`, modalEscPressHandler);
};

const commentsFocusInHandler = () => {
  document.removeEventListener(`keydown`, modalEscPressHandler);
};

const commentsFocusOutHandler = () => {
  document.addEventListener(`keydown`, modalEscPressHandler);
};

const openModalHandler = () => {
  openModal();
};

const modalCloseBtnClickHandler = () => {
  closeModal();
};

window.popup = {
  openModalHandler,
  modalCloseBtnClickHandler,
  closeModal,
  uploadImageFile,
  imageUploadOverlay
};

