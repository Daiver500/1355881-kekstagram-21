
"use strict";

(function () {
const main = document.querySelector(`main`);
  const onErrorUpload = document.querySelector(`#error`)
  .content
  .querySelector(`.error`);

  const errorHandlerUpload = function () {
    const fragment = document.createDocumentFragment();
    const errorElement = onErrorUpload.cloneNode(true);
    fragment.appendChild(errorElement);
    main.appendChild(fragment);
    console.log(fragment);

    const errorButton = document.querySelector(`.error__button`);

    const errorClose = function () {
      errorButton.addEventListener(`click`, function () {
        main.removeChild(errorElement);
      });
      window.addEventListener(`click`, function () {
        main.removeChild(errorElement);
      });
    };
    errorClose();


    const errorEscPress = function (evt) {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        main.removeChild(errorElement);
      }
    };

    document.body.addEventListener(`keydown`, errorEscPress);
  };
})();
