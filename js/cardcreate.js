"use strict";

(function () {

  // Обращение к шаблону
  const AVATAR = {
    width: 35,
    height: 25,
  };

  const template = document.querySelector(`#picture`)
.content
.querySelector(`.picture`);

  // Создание фукнции на основе шаблона

  const createCardElement = function (object) {
    const cardElement = template.cloneNode(true);

    cardElement.querySelector(`.picture__likes`).textContent = object.likes;
    cardElement.querySelector(`.picture__comments`).textContent = object.comments.length;
    cardElement.querySelector(`img`).src = object.url;
    return cardElement;
  };

  // 6.1
  const successHandler = function (cards) {
    const renderPictures = function () {
      const pictures = document.querySelector(`.pictures`);
      const fragment = document.createDocumentFragment();
      cards.forEach(function (value) {
        fragment.appendChild(createCardElement(value));
      });
      pictures.appendChild(fragment);
      return fragment;
    };

    renderPictures(cards);

    const createSocialComment = function (object) {
      const fragment = document.createDocumentFragment();
      const socialComments = document.querySelector(`.social__comments`);
      const socialComment = socialComments.querySelector(`li`);
      socialComments.innerHTML = ``;

      object.comments.forEach(function (value) {
        const li = socialComment.cloneNode(true);
        li.querySelector(`.social__picture`).src = value.avatar;
        li.querySelector(`.social__picture`).alt = value.name;
        li.querySelector(`.social__picture`).width = AVATAR.width;
        li.querySelector(`.social__picture`).height = AVATAR.height;
        li.querySelector(`.social__text`).textContent = value.message;
        fragment.append(li);
        socialComments.append(fragment);
      });
    };

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
    bigPictureOpened(cards);

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
  };
  window.load(successHandler);

  // 6.2

  const form = document.querySelector(`.img-upload__form`);
  const imageUploadOverlay = document.querySelector(`.img-upload__overlay`);

  const submitHandler = function (evt) {
    window.upload(new FormData(form), function () {
      imageUploadOverlay.classList.add(`hidden`);
    });
    window.modalopenclose.uploadImageFile.value = ``;
    window.validation.hashTagsInput.textContent = ``;
    window.validation.commentsField.textContent = ``;
    window.effects.setDefaultDepth();
    evt.preventDefault();
  };
  form.addEventListener(`submit`, submitHandler);

  const onErrorUpload = document.querySelector(`#error`);
  const errorHandlerUpload = function () {
    let element = document.createElement(`div`);
    element.append(onErrorUpload.content.cloneNode(true));
    document.main.insertAdjacentElement(`afterbegin`, element);
  };

  const onSucessUpload = document.querySelector(`#success`);
  const successHandlerUpload = function () {
    let element = document.createElement(`div`);
    element.append(onSucessUpload.content.cloneNode(true));
    document.main.insertAdjacentElement(`afterbegin`, element);
  };

  window.load(successHandlerUpload, errorHandlerUpload);
})();


