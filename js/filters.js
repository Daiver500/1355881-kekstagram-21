"use strict";

(function () {
  const MAX_RANDOM_ELEMENTS = 10;
  const filtersForm = document.querySelector(`.img-filters__form`);
  const renderPictures = window.cardcreate.renderPictures;
  const filterDefaultPhotos = document.querySelector(`#filter-default`);
  const filterRandomPhotos = document.querySelector(`#filter-random`);
  const filterMaxCommentsPhotos = document.querySelector(`#filter-discussed`);

  // показываем дефолтные картинки
  const showDefaultPictures = function () {
    const defaultPhotos = window.cardcreate.cardList; // вопрос ???
    renderPictures(defaultPhotos);
    window.cardcreate.clickSmallPhoto(defaultPhotos);
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
    const picturesList = window.cardcreate.cardList; // вопрос ???
    const randomElements = shuffleArray(picturesList).slice(0, MAX_RANDOM_ELEMENTS);
    renderPictures(randomElements);
    window.cardcreate.clickSmallPhoto(randomElements);
  };

  // обсуждаемые картинки
  const showDiscussedPictures = function () {
    const picturesListCopy = window.cardcreate.cardList.slice();
    const sortedList = picturesListCopy.sort(function (a, b) {
      return a.comments.length - b.comments.length;
    });
    renderPictures(sortedList);
    window.cardcreate.clickSmallPhoto(sortedList);
  };

  // удаление картинок
  const removePictures = function () {
    const pics = document.querySelectorAll(`.picture`);
    pics.forEach(function (item) {
      item.remove();
    });
  };
  // функция фильтрации

  const onFilterClick = window.debounce.debounce(function (evt) {
    removePictures();

    switch (evt.target.id) {
      case `filter-default`:
        showDefaultPictures();
        clickFilterDefaultButton();
        break;
      case `filter-random`:
        showRandomPictures();
        clickFilterRandomButton();
        break;
      case `filter-discussed`:
        showDiscussedPictures();
        clickFilterDiscussedButton();
        break;
      default:
        showDefaultPictures();
    }
  });
  filtersForm.addEventListener(`click`, onFilterClick);

  // клик по меню

  const clickFilterDefaultButton = function () {
    filterRandomPhotos.classList.remove(`img-filters__button--active`);
    filterMaxCommentsPhotos.classList.remove(`img-filters__button--active`);
    filterDefaultPhotos.classList.add(`img-filters__button--active`);
  };
  const clickFilterRandomButton = function () {
    filterDefaultPhotos.classList.remove(`img-filters__button--active`);
    filterMaxCommentsPhotos.classList.remove(`img-filters__button--active`);
    filterRandomPhotos.classList.add(`img-filters__button--active`);
  };
  const clickFilterDiscussedButton = function () {
    filterDefaultPhotos.classList.remove(`img-filters__button--active`);
    filterRandomPhotos.classList.remove(`img-filters__button--active`);
    filterMaxCommentsPhotos.classList.add(`img-filters__button--active`);
  };

})();
