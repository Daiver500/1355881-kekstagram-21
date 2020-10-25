"use strict";

(function () {

  const buttonFilter = document.querySelectorAll(`.img-filters__button`);


  for (let button of buttonFilter) {
    button.addEventListener(`click`, function () {

      button.classList.add(`img-filters__button--active`);

    });
  }


})();
