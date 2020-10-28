// 6.2
"use strict";

(function () {

  const form = document.querySelector(`.img-upload__form`);
  const imageUploadOverlay = document.querySelector(`.img-upload__overlay`);

  const imageDataReset = function () {
    window.effects.setDefaultDepth();
    window.modalopenclose.uploadImageFile.value = ``;
    window.scale.imageUploadPreview.style.filter = ``;
    window.scale.imageUploadPreview.className = `effects__preview--none`;
  };

  const submitHandler = function (evt) {
    window.server.upload(
        new FormData(form),
        function () {
          form.reset();
          imageDataReset();
          imageUploadOverlay.classList.add(`hidden`);
          window.success.successUploadHandler();
        },
        function () {
          window.error.errorUploadHandler();
        });
    evt.preventDefault();
  };

  form.addEventListener(`submit`, submitHandler);

  window.submit = {
    imageDataReset
  };

})();