"use strict";

const MAX_RANDOM_ELEMENTS = 10;

const filtersForm = document.querySelector(`.img-filters__form`);
const renderPictures = window.cardcreate.renderPictures;

const showDefaultPictures = () => {
  const defaultPhotos = window.cardcreate.cardsList;
  renderPictures(defaultPhotos);
  window.cardcreate.clickSmallPhoto(defaultPhotos);
};

const shuffleArray = (arrayOfPhotos) => {
  const arrayCopyOfPhotos = arrayOfPhotos.slice();
  const iterations = MAX_RANDOM_ELEMENTS < arrayCopyOfPhotos.length ? MAX_RANDOM_ELEMENTS : arrayCopyOfPhotos.length - 1;

  for (let i = 0; i < iterations; i++) {
    const randomIndex = Math.floor(Math.random() * (arrayCopyOfPhotos.length - i)) + i;
    const currentElement = arrayCopyOfPhotos[i];
    arrayCopyOfPhotos[i] = arrayCopyOfPhotos[randomIndex];
    arrayCopyOfPhotos[randomIndex] = currentElement;
  }
  return arrayCopyOfPhotos;
};

const showRandomPictures = () => {
  const picturesList = window.cardcreate.cardsList;
  const randomElements = shuffleArray(picturesList).slice(0, MAX_RANDOM_ELEMENTS);
  renderPictures(randomElements);
  window.cardcreate.clickSmallPhoto(randomElements);
};

const showDiscussedPictures = () => {
  const picturesListCopy = window.cardcreate.cardsList.slice();
  const sortedList = picturesListCopy.sort((a, b) => {
    return b.comments.length - a.comments.length;
  });
  renderPictures(sortedList);
  window.cardcreate.clickSmallPhoto(sortedList);
};

const removePictures = () => {
  const pics = document.querySelectorAll(`.picture`);
  pics.forEach((item) => {
    item.remove();
  });
};

const setActiveFilterBtn = (evt) => {
  const currentActive = filtersForm.querySelector(`.img-filters__button--active`);
  const {target} = evt;
  if (!target.classList.contains(`img-filters__button--active`)) {
    currentActive.classList.remove(`img-filters__button--active`);
    target.classList.add(`img-filters__button--active`);
  }
};

const filterClickHandler = window.timeout.debounce((evt) => {
  removePictures();
  setActiveFilterBtn(evt);

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
filtersForm.addEventListener(`click`, filterClickHandler);

