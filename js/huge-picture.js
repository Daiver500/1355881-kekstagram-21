
"use strict";

const MAX_COMMENTS_AMOUNT = 5;
const AVATAR = {
  width: 35,
  height: 25,
};

const bigPicture = document.querySelector(`.big-picture`);
const social = bigPicture.querySelector(`.social`);
const socialComments = social.querySelector(`.social__comments`);
const socialCommentCount = social.querySelector(`.social__comment-count`);
const currentCommentsCount = bigPicture.querySelector(`.comments-current`);
const socialComment = socialComments.querySelector(`li`);
const commentsLoader = social.querySelector(`.comments-loader`);
const bigPictureCancel = bigPicture.querySelector(`.big-picture__cancel`);
let commentsCopy = [];

socialCommentCount.classList.add(`hidden`);

const createSocialComment = (commentObject) => {
  const {avatar, name, message} = commentObject;
  const li = socialComment.cloneNode(true);
  const picture = li.querySelector(`.social__picture`);
  const text = li.querySelector(`.social__text`);
  picture.src = avatar;
  picture.alt = name;
  picture.width = AVATAR.width;
  picture.height = AVATAR.height;
  text.textContent = message;
  return li;
};

const renderSocialComments = (commentsArray) => {
  const comments = commentsArray.splice(0, 5);
  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const commentElement = createSocialComment(comment);
    fragment.append(commentElement);
  });
  socialComments.append(fragment);
  return comments;
};

const moreCommentsBtnClickHandler = () => {
  const comments = renderSocialComments(commentsCopy);
  currentCommentsCount.textContent = Number(currentCommentsCount.textContent) + comments.length;

  if (commentsCopy.length === 0) {
    commentsLoader.classList.add(`hidden`);
    commentsLoader.removeEventListener(`click`, moreCommentsBtnClickHandler);
  }
};

const openBigPicture = (object) => {
  const {url, likes, comments, description} = object;
  const commentsAmount = comments.length;
  commentsCopy = comments.slice();
  socialComments.innerHTML = ``;
  bigPicture.querySelector(`.big-picture__img img`).src = url;
  bigPicture.querySelector(`.likes-count`).textContent = likes;
  bigPicture.querySelector(`.comments-current`).textContent = (commentsAmount <= MAX_COMMENTS_AMOUNT) ? commentsAmount : MAX_COMMENTS_AMOUNT;
  bigPicture.querySelector(`.comments-count`).textContent = commentsAmount;
  bigPicture.querySelector(`.social__caption`).textContent = description;
  renderSocialComments(commentsCopy);
  bigPicture.classList.remove(`hidden`);
  socialCommentCount.classList.remove(`hidden`);
  document.body.classList.add(`modal-open`);
  document.addEventListener(`keydown`, bigPictureEscPressHandler);
  bigPictureCancel.addEventListener(`click`, closeButtonClickHandler);

  if (comments.length > MAX_COMMENTS_AMOUNT) {
    commentsLoader.classList.remove(`hidden`);
    commentsLoader.addEventListener(`click`, moreCommentsBtnClickHandler);
  } else {
    commentsLoader.classList.add(`hidden`);
  }
};

const bigPictureEscPressHandler = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const closeButtonClickHandler = (evt) => {
  evt.preventDefault();
  closeBigPicture();

};

const closeBigPicture = () => {
  bigPicture.classList.add(`hidden`);
  document.removeEventListener(`keydown`, bigPictureEscPressHandler);
  document.body.classList.remove(`modal-open`);
  bigPictureCancel.removeEventListener(`click`, closeButtonClickHandler);
};

window.hugepicture = {
  openBigPicture,
  bigPictureEscPressHandler,
  bigPicture
};

