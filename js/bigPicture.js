
"use strict";

(function () {

  const bigPicture = document.querySelector(`.big-picture`);
  const bigPictureOpened = function (object) {
    bigPicture.classList.remove(`hidden`);
    const {url, likes, comments, description} = object;
    bigPicture.querySelector(`.big-picture__img img`).src = url;
    bigPicture.querySelector(`.likes-count`).textContent = likes;
    bigPicture.querySelector(`.comments-count`).textContent = comments;
    bigPicture.querySelector(`.social__caption`).textContent = description;
    // createSocialComment(cards);
  };
  bigPictureOpened(data);

  bigPicture.classList.add(`hidden`);

  // Добавляем класс hidden

  const socialCommentCount = document.querySelector(`.social__comment-count`);
  socialCommentCount.classList.add(`hidden`);

  const commentsLoader = document.querySelector(`.comments-loader`);
  commentsLoader.classList.add(`hidden`);

  // Добавляем класс на body (для фиксации фона)

  document.querySelector(`body`).classList.add(`modal-open`);

  // Раздел 4.2.

  const smallPhotos = document.querySelectorAll(`.picture`);

  const addSmallPhotoClicker = function (smallphoto, content) {
    smallphoto.addEventListener(`click`, function (evt) {
      evt.preventDefault();
      document.addEventListener(`keydown`, bigPictureEscPress);
      bigPictureOpened(content);
      createSocialComment(content);
    });
  };

  for (let i = 0; i < smallPhotos.length; i++) {
    addSmallPhotoClicker(smallPhotos[i], cards[i]);
  }

  // Закрываем превью фото с коментами


  const bigPictureCancel = document.querySelector(`.big-picture__cancel`);

  const bigPictureEscPress = function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closeBigPicture();
    }
  };

  document.addEventListener(`keydown`, bigPictureEscPress);

  const closeBigPicture = function () {
    bigPicture.classList.add(`hidden`);
    document.removeEventListener(`keydown`, bigPictureEscPress);
  };

  bigPictureCancel.addEventListener(`click`, function () {
    closeBigPicture();
  });
})();
