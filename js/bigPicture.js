
"use strict";

(function () {

  const bigPicture = document.querySelector(`.big-picture`);
  const openBigPicture = function (object) {
    bigPicture.classList.remove(`hidden`);
    const {url, likes, comments, description} = object;
    bigPicture.querySelector(`.big-picture__img img`).src = url;
    bigPicture.querySelector(`.likes-count`).textContent = likes;
    bigPicture.querySelector(`.comments-count`).textContent = comments;
    bigPicture.querySelector(`.social__caption`).textContent = description;
  };

  const socialCommentCount = document.querySelector(`.social__comment-count`);
  socialCommentCount.classList.add(`hidden`);

  const commentsLoader = document.querySelector(`.comments-loader`);
  commentsLoader.classList.add(`hidden`);

  document.querySelector(`body`).classList.add(`modal-open`);

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

  window.bigpicture = {
    openBigPicture,
    bigPictureEscPress,
    bigPicture
  };
})();
