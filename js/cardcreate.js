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

  window.load(successHandler, errorHandler);

  // 6.2

  const main = document.querySelector(`main`);

  const onSuccessUpload = document.querySelector(`#success`)
.content
.querySelector(`.success`);

  const successHandlerUpload = function () {
    const fragment = document.createDocumentFragment();
    const successElement = onSuccessUpload.cloneNode(true);
    fragment.appendChild(successElement);
    main.appendChild(fragment);
  };


  const successButton = document.querySelector(`.success__button`);
  const successInner = document.querySelector(`.success`);

  const successClose = function () {
    successButton.addEventListener(`click`, function () {
      successInner.classList.add(`hidden`);
    });
    window.addEventListener(`click`, function () {
      successInner.classList.add(`hidden`);
    });
  };

  const sucessEscPress = function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      successInner.classList.add(`hidden`);
    }
  };

  document.body.addEventListener(`keydown`, sucessEscPress);

  const onErrorUpload = document.querySelector(`#error`)
.content
.querySelector(`.error`);


  const errorHandlerUpload = function () {
    const fragment = document.createDocumentFragment();
    const errorElement = onErrorUpload.cloneNode(true);
    fragment.appendChild(errorElement);
    main.appendChild(fragment);
  };

  const errorButton = document.querySelector(`.error__button`);
  const errorInner = document.querySelector(`.error`);

  const errorClose = function () {
    errorButton.addEventListener(`click`, function () {
      errorInner.classList.add(`hidden`);
    });
    window.addEventListener(`click`, function () {
      errorInner.classList.add(`hidden`);
    });
  };


  const errorEscPress = function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      errorInner.classList.add(`hidden`);
    }
  };

  document.body.addEventListener(`keydown`, errorEscPress);


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
})();


