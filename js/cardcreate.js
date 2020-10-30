"use strict";

(function () {


  const pictures = document.querySelector(`.pictures`);
  const filters = document.querySelector(`.img-filters`);
  const openBigPicturePopup = window.bigpicture.openBigPicture;
  // let cardsList = [];

  const template = document.querySelector(`#picture`)
.content
.querySelector(`.picture`);

  const createCardElement = function (object) {
    const {likes, comments, url} = object;
    const cardElement = template.cloneNode(true);
    cardElement.querySelector(`.picture__likes`).textContent = likes;
    cardElement.querySelector(`.picture__comments`).textContent = comments.length;
    cardElement.querySelector(`img`).src = url;
    return cardElement;
  };

  // 6.1

  const renderPictures = function (cardsArray) {
    const fragment = document.createDocumentFragment();
    cardsArray.forEach(function (cardObject) {
      fragment.appendChild(createCardElement(cardObject));
    });
    pictures.appendChild(fragment);
    return fragment;
  };

  const errorHandler = function (errorMessage) {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  const test = function (data) {
    const smallPhotosList = document.querySelectorAll(`.picture`);
    smallPhotosList.forEach(function (picture, index) {
      picture.addEventListener(`click`, function(evt) {
        evt.preventDefault();
        openBigPicturePopup(data[index]);
      });
    });
  }

  const successDataLoadHandler = function (data) {
    window.cardcreate.cardList = [];
    window.cardcreate.cardList = data;
    renderPictures(data);
    test(data);
    console.log(window.cardcreate.cardList)
    filters.classList.remove(`img-filters--inactive`);
  };

  window.server.load(successDataLoadHandler, errorHandler);

  window.cardcreate = {
    renderPictures,
    test
  };

})();


