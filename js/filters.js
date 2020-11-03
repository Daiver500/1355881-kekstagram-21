"use strict";

(function () {
  const MAX_RANDOM_ELEMENTS = 10;
  const DEBOUNCE_INTERVAL = 500;
  const filtersForm = document.querySelector(`.img-filter__form`);
  const renderPictures = window.cardcreate.renderPictures;

  const debounce = (cb) => {
    let lastTimeout = null;
    return (...parameters) => {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(() => {
        cb(...parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  // показываем дефолтные картинки
  const showDefaultPictures = function () {
    renderPictures(window.data.picturesList);
  };

  // функция перемешивания массива
  const shuffleArray = function (array) {
    const arrayCopy = array.slice();
    const iterations = MAX_RANDOM_ELEMENTS < arrayCopy.length ? MAX_RANDOM_ELEMENTS : arrayCopy.length - 1;

    for (let i = 0; i < iterations; i++) {
      const randomIndex = Math.floor(Math.random() * (arrayCopy.length - i)) + i;
      const currentElement = arrayCopy[i];
      arrayCopy[i] = arrayCopy[randomIndex];
      arrayCopy[randomIndex] = currentElement;
    }

    return arrayCopy;
  };

  // показываем рандомные картинки
  const showRandomPictures = function () {
    const picturesList = window.data.picturesList;
    const randomElements = shuffleArray(picturesList).slice(0, MAX_RANDOM_ELEMENTS);

    renderPictures(randomElements);
  };

  // обсуждаемые картинки
  const showDiscussedPictures = function () {
    const picturesListCopy = window.data.picturesList.slice();
    const sortedList = picturesListCopy.sort(function (a, b) {
      return a.comments.length - b.comments.length;
    });

    renderPictures(sortedList);
  };
  // удаление картинок
  const removePictures = function () {
    const pics = document.querySelectorAll(`.picture`);
    pics.forEach((item) => {
      item.remove();
    });
  };
  // функция фильтрации
  const onFilterClick = debounce(function (evt) {
    removePictures();

    switch (evt.target.id) {
      case `filter-default`:
        showDefaultPictures();
        break;
      case `filter-random`:
        showRandomPictures();
        break;
      case `filter-discussed`:
        showDiscussedPictures();
        break;
      default:
        showDefaultPictures();
    }
  });
  filtersForm.addEventListener(`click`, onFilterClick);
})();
