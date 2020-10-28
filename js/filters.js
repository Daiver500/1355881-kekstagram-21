"use strict";

(function () {

  const filterDefaultPhotos = document.querySelector(`#filter-default`);
  const filterRandomPhotos = document.querySelector(`#filter-random`);
  const filterMaxCommentsPhotos = document.querySelector(`#filter-discussed`);

  // Массив фото с сервера (дефолт)

  const photosFromServerDefault = function () {
    const defaultPhotos = window.cardcreate.cardsSet;
    console.log(defaultPhotos);
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
    console.log(shuffle);
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
    console.log(maxCommentsPhotosArray);
    window.cardcreate.renderPictures(maxCommentsPhotosArray);
  };


  // Обработчики клика
  const picture = document.querySelector(`.pictures`);

  filterDefaultPhotos.addEventListener(`click`, function () {
    photosFromServerDefault();
  });

  filterRandomPhotos.addEventListener(`click`, function () {
    picture.innerHTML = ``;
    tenRandomPhotos();
  });

  filterMaxCommentsPhotos.addEventListener(`click`, function () {
    photosWithMaxComments();
  });

  // клик по меню

})();
