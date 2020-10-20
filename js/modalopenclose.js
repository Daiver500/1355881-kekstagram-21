"use strict";
(function () {
// Загрузка изображения и показ формы редактирования 1.2 и 1.3.

  const uploadImageFile = document.querySelector(`#upload-file`);
  const imageUploadOverlay = document.querySelector(`.img-upload__overlay`);
  const uploadCancel = document.querySelector(`#upload-cancel`);


  const modalEscPress = function (evt) {
    if (evt.Keycode === 27) {
      closeModal();
      evt.preventDefault();
    }
  };

  (function () {
    window.modalopenclose = {
      modalEscPress
    };
  })();


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
  };

  uploadImageFile.addEventListener(`change`, function () {
    openModal();
  });

  uploadCancel.addEventListener(`click`, function () {
    closeModal();
  });
})();
