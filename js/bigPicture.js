
"use strict";

(function () {

  const AVATAR = {
    width: 35,
    height: 25,
  };

  const bigPicture = document.querySelector(`.big-picture`);
  const social = bigPicture.querySelector(`.social`)
  const socialComments = social.querySelector(`.social__comments`);
  const socialComment = socialComments.querySelector(`li`);
  const socialCommentCount = social.querySelector(`.social__comment-count`);
  const commentsLoader = social.querySelector(`.comments-loader`);
  const bigPictureCancel = bigPicture.querySelector(`.big-picture__cancel`);

  socialCommentCount.classList.add(`hidden`);
  commentsLoader.classList.add(`hidden`);

  const createSocialComments = function (commentsArray) {
    const fragment = document.createDocumentFragment();
    socialComments.innerHTML = ``;

    commentsArray.forEach(function (commentObject) {
      const {avatar, name, message} = commentObject;
      const li = socialComment.cloneNode(true);
      const picture = li.querySelector(`.social__picture`);
      picture.src = avatar;
      picture.alt = name;
      picture.width = AVATAR.width;
      picture.height = AVATAR.height;
      li.querySelector(`.social__text`).textContent = message;
      fragment.append(li);
      socialComments.append(fragment);
    });
  };

  const openBigPicture = function (object) {
    const {url, likes, comments, description} = object;
    bigPicture.querySelector(`.big-picture__img img`).src = url;
    bigPicture.querySelector(`.likes-count`).textContent = likes;
    bigPicture.querySelector(`.comments-count`).textContent = comments.length;
    bigPicture.querySelector(`.social__caption`).textContent = description;
    createSocialComments(comments);
    bigPicture.classList.remove(`hidden`);
    document.body.classList.add(`modal-open`);
    document.addEventListener(`keydown`, bigPictureEscPress)
    bigPictureCancel.addEventListener(`click`, closeButtonClickHandler);

    const newFunction = function (comments) {
      const newArray = comments.slice();
      if (newArray.length >= 5) {
      commentsLoader.classList.remove(`hidden`);
      newArray.splice(5);
      console.log(newArray)
      createSocialComments(newArray)
    } else {
      commentsLoader.classList.add(`hidden`);
    }
   }
   newFunction(comments)
   commentsLoader.onclick = function () {
    createSocialComments(comments);
   };
  };

  const bigPictureEscPress = function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closeBigPicture();
    }
  };

  const closeButtonClickHandler = function (evt) {
    evt.preventDefault();
    closeBigPicture();

  };

  const closeBigPicture = function () {
    bigPicture.classList.add(`hidden`);
    document.removeEventListener(`keydown`, bigPictureEscPress);
    document.body.classList.remove(`modal-open`);
    bigPictureCancel.removeEventListener(`click`, closeButtonClickHandler);
  };

  window.bigpicture = {
    openBigPicture,
    bigPictureEscPress,
    bigPicture
  };
})();
