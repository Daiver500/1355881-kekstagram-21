"use strict";

(function () {

  const buttonFilter = document.querySelectorAll(`.img-filters__button`);


  for (let button of buttonFilter) {
    button.addEventListener(`click`, function () {

      button.classList.add(`img-filters__button--active`);

    });
  }

  const imageFilter = document.querySelector(`.img-filters`);

  const onLoadFilter = function () {
    if (window.load) {
      imageFilter.classList.remove(`img-filters--inactive`);
    }
  };
  onLoadFilter();

  const filterDefault = document.querySelector(`#filter-default`);
  const filterRandom = document.querySelector(`#filter-random`);
  const filterDiscussed = document.querySelector(`#filter-discussed`);
  const imgFiltersButton = document.querySelector(`.img-filters__button`);

  if (imgFiltersButton.classList.contains(`img-filters__button--active`)) {
    imgFiltersButton.classList.toggle(`img-filters__button--active`);
  }

  // Функция рандомного вызова массива (сообщения, имена)

  const getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getRandomArrayElement = function (array) {
    return array[getRandomInt(0, array.length - 1)];
  };

  filterDefault.addEventListener(`click`, function () {
    photosFromServer();
  });

  const photosFromServer = function () {
    const defaultPhotos = window.cardcreate.cardsSet;
    console.log(defaultPhotos);
  };


  filterRandom.addEventListener(`click`, function () {
    tenRandomPhotos();
  });

  const objectsAmount = 10;

  const tenRandomPhotos = function () {
    const newArray = [];
    for (let i = 1; i <= objectsAmount; i++) {

      newArray.push(
          window.cardcreate.cardsSet.sort(function () {
            return Math.random() - 0.5;
          })
      );

    }
    console.log(newArray);
    return newArray;
  };

  filterDiscussed.addEventListener(`click`, function () {
    photosByComments();
  });


  const photosByComments = function () {
    const newArray2 = [];
    for (let i = 0; i < window.cardcreate.cardsSet.length; i++) {
      newArray2.push(
          window.cardcreate.cardsSet[i]);
    }
    newArray2.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    console.log(newArray2);

  };


})();
