"use strict";

(function () {

  const filterDefaultPhotos = document.querySelector(`#filter-default`);
  const filterRandomPhotos = document.querySelector(`#filter-random`);
  const filterMaxCommentsPhotos = document.querySelector(`#filter-discussed`);

  let lastTimeout;
  const DEBOUNCE_INTERVAL = 500;
  window.debounce = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };


  // Массив фото с сервера (дефолт)

  const photosFromServerDefault = function () {
    const defaultPhotos = window.cardcreate.cardsSet;
    window.cardcreate.renderPictures(defaultPhotos);
  };

  // Массив 10 рандомных фото

  const tenRandomPhotos = function () {
    const objectsAmount = 10;
    const newArray = [];
    for (let i = 0; i < window.cardcreate.cardsSet.length; i++) {
      newArray.push(window.cardcreate.cardsSet[i]);
    }
    const shuffle = newArray.sort(function () {
      return Math.random() - 0.5;
    });

    shuffle.length = objectsAmount;
    window.cardcreate.renderPictures(shuffle);
  };

  // Массив фото по макс комментариям

  const photosWithMaxComments = function () {
    const maxCommentsPhotosArray = [];
    for (let i = 0; i < window.cardcreate.cardsSet.length; i++) {
      maxCommentsPhotosArray.push(
          window.cardcreate.cardsSet[i]);
    }
    maxCommentsPhotosArray.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    window.cardcreate.renderPictures(maxCommentsPhotosArray);
  };


  // Обработчики клика

  const photosRemove = function () {
    const pics = document.querySelectorAll(`.picture`);
    pics.forEach((item) => {
      item.remove();
    });
  };


  filterDefaultPhotos.addEventListener(`click`, function () {
    photosRemove();
    window.debounce(window.cardcreate.renderPictures(photosFromServerDefault()));
  });

  filterRandomPhotos.addEventListener(`click`, function () {
    photosRemove();
    window.debounce(window.cardcreate.renderPictures(tenRandomPhotos()));

  });

  filterMaxCommentsPhotos.addEventListener(`click`, function () {
    photosRemove();
    window.debounce(window.cardcreate.renderPictures(photosWithMaxComments()));

  });

  // клик по меню

  filterRandomPhotos.onclick = function () {
    filterDefaultPhotos.classList.remove(`img-filters__button--active`);
    filterMaxCommentsPhotos.classList.remove(`img-filters__button--active`);
    filterRandomPhotos.classList.add(`img-filters__button--active`);
  };

  filterMaxCommentsPhotos.onclick = function () {
    filterDefaultPhotos.classList.remove(`img-filters__button--active`);
    filterRandomPhotos.classList.remove(`img-filters__button--active`);
    filterMaxCommentsPhotos.classList.add(`img-filters__button--active`);
  };

  filterDefaultPhotos.onclick = function () {
    filterRandomPhotos.classList.remove(`img-filters__button--active`);
    filterMaxCommentsPhotos.classList.remove(`img-filters__button--active`);
    filterDefaultPhotos.classList.add(`img-filters__button--active`);
  };

})();
