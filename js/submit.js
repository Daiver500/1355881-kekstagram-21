// 6.2
"use strict";

(function () {

  const form = document.querySelector(`.img-upload__form`);
  const imageUploadOverlay = document.querySelector(`.img-upload__overlay`);

  const submitHandler = function (evt) {
    window.server.upload(new FormData(form), function () {
      imageUploadOverlay.classList.add(`hidden`);
      window.success.successHandlerUpload();
    });
    window.effects.setDefaultDepth();
    window.modalopenclose.uploadImageFile.value = ``;
    window.scale.imageUploadPreview.style.filter = ``;
    evt.preventDefault();
  };

  form.addEventListener(`submit`, submitHandler);

})();
