
"use strict";

(function () {
  const main = document.querySelector(`main`);
  const onSuccessUpload = document.querySelector(`#success`)
  .content
  .querySelector(`.success`);

  const successHandlerUpload = function () {
    const fragment = document.createDocumentFragment();
    const successElement = onSuccessUpload.cloneNode(true);
    fragment.appendChild(successElement);
    main.appendChild(fragment);
    console.log(fragment);

    const successButton = document.querySelector(`.success__button`);
    const success = document.querySelector(`.success`);

    const successClose = function () {
      successButton.addEventListener(`click`, function () {
        main.removeChild(successElement);
      });
      success.addEventListener(`click`, function () {
        main.removeChild(successElement);
      });
    };
    successClose();

    const sucessEscPress = function (evt) {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        main.removeChild(successElement);
      }
    };
    document.body.addEventListener(`keydown`, sucessEscPress);
  };

  window.success = {
    successHandlerUpload
  };
})();
