"use strict";
(function () {

  const uploadImageFile = document.querySelector(`#upload-file`);
  const imageUploadOverlay = document.querySelector(`.img-upload__overlay`);
  const uploadCancel = document.querySelector(`#upload-cancel`);

  const modalEscPress = function (evt) {
    if (evt.key === `Escape`) {
      closeModal();
      evt.preventDefault();
    }
  };

  window.modalopenclose = {
    modalEscPress,
    uploadImageFile
  };

  const openModal = function () {
    imageUploadOverlay.classList.remove(`hidden`);
    document.querySelector(`body`).classList.add(`modal-open`);
    document.addEventListener(`keydown`, modalEscPress);
  };

  const closeModal = function () {
    imageUploadOverlay.classList.add(`hidden`);
    document.querySelector(`body`).classList.remove(`modal-open`);
    document.removeEventListener(`keydown`, modalEscPress);
    uploadImageFile.value = ``;
    window.submit.resetImageData();
  };

  uploadImageFile.addEventListener(`change`, function () {
    openModal();
  });

  uploadCancel.addEventListener(`click`, function () {
    closeModal();
  });
})();
