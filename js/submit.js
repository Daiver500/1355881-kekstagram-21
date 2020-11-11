
"use strict";

const form = document.querySelector(`.img-upload__form`);
const imageUploadOverlay = document.querySelector(`.img-upload__overlay`);

const resetImageData = function () {
  window.effects.setDefaultDepth();
  window.modal.uploadImageFile.value = ``;
  window.scale.imageUploadPreview.style.filter = ``;
  window.scale.imageUploadPreview.style.transform = `scale(1.00)`;
  window.scale.imageUploadPreview.className = `effects__preview--none`;
  window.effects.effectLevel.classList.add(`hidden`);
};

const formSubmitHandler = function (evt) {
  window.server.upload(
      new FormData(form),
      function () {
        form.reset();
        resetImageData();
        imageUploadOverlay.classList.add(`hidden`);
        window.success.successUploadHandler();
      },
      function () {
        window.error.errorUploadHandler();
      });
  evt.preventDefault();
};

// form.addEventListener(`submit`, submitHandler);

window.submit = {
  formSubmitHandler,
  resetImageData
};
