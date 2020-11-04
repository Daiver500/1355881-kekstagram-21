
"use strict";

(function () {

  const main = document.querySelector(`main`);
  const onErrorUpload = document.querySelector(`#error`)
  .content
  .querySelector(`.error`);

  const errorElement = onErrorUpload.cloneNode(true);
  const errorButton = errorElement.querySelector(`.error__button`);
  const errorInner = errorElement.querySelector(`.error__inner`);

  const createErrorModule = function () {
    main.insertAdjacentElement(`beforeend`, errorElement);
    errorButton.addEventListener(`click`, errorButtonClickHandler);
    document.addEventListener(`click`, errorWindowClickHandler);
    document.addEventListener(`keydown`, errorEscPress);
  };

  const deleteErrorModule = function () {
    main.removeChild(errorElement);
    errorButton.removeEventListener(`click`, errorButtonClickHandler);
    document.removeEventListener(`click`, errorWindowClickHandler);
    document.removeEventListener(`keydown`, errorEscPress);
  };

  const errorButtonClickHandler = function () {
    deleteErrorModule();
  };

  const errorWindowClickHandler = function (evt) {
    if (evt.target !== errorInner) {
      deleteErrorModule();
    }
  };

  const errorEscPress = function (evt) {
    if (evt.key === `Escape`) {
      deleteErrorModule();
    }
  };

  const errorUploadHandler = function () {
    createErrorModule();
  };

  window.error = {
    errorUploadHandler
  };

})();
