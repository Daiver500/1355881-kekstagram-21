/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
(() => {
/*!**********************!*\
  !*** ./js/server.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


(function () {

  const URL = {
    load: `https://21.javascript.pages.academy/kekstagram/data`,
    upload: `https://21.javascript.pages.academy/kekstagram`
  };

  const StatusCode = {
    OK: 200
  };
  const TIMEOUT_IN_MS = 10000;

  const server = function (xhr, onSuccess, onError) {
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });
    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;
  };

  const load = function (success, error) {
    const xhr = new XMLHttpRequest();
    xhr.open(`GET`, URL.load);
    server(xhr, success, error);
    xhr.send();
  };


  const upload = function (data, success, error) {
    const xhr = new XMLHttpRequest();
    xhr.open(`POST`, URL.upload);
    server(xhr, success, error);
    xhr.send(data);
  };

  window.server = {
    load,
    upload
  };

})();

})();

(() => {
/*!***********************!*\
  !*** ./js/timeout.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


(function () {

  const DEBOUNCE_INTERVAL = 500;

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

  window.timeout = {
    debounce
  };


})();

})();

(() => {
/*!**************************!*\
  !*** ./js/bigpicture.js ***!
  \**************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */



(function () {

  const MAX_COMMENTS_AMOUNT = 5;
  const AVATAR = {
    width: 35,
    height: 25,
  };

  const bigPicture = document.querySelector(`.big-picture`);
  const social = bigPicture.querySelector(`.social`);
  const socialComments = social.querySelector(`.social__comments`);
  const socialCommentCount = social.querySelector(`.social__comment-count`);
  const socialComment = socialComments.querySelector(`li`);
  const commentsLoader = social.querySelector(`.comments-loader`);
  const bigPictureCancel = bigPicture.querySelector(`.big-picture__cancel`);
  let commentsCopy = [];

  socialCommentCount.classList.add(`hidden`);

  const createSocialComment = function (commentObject) {
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

  const renderSocialComments = function (commentsArray) {
    const comments = commentsArray.splice(0, 5);
    const fragment = document.createDocumentFragment();

    comments.forEach(function (comment) {
      const commentElement = createSocialComment(comment);
      fragment.append(commentElement);
    });
    socialComments.append(fragment);
  };

  const moreCommentsBtnClickHandler = function () {
    renderSocialComments(commentsCopy);
    if (commentsCopy.length === 0) {
      commentsLoader.classList.add(`hidden`);
      commentsLoader.removeEventListener(`click`, moreCommentsBtnClickHandler);
    }
  };

  const openBigPicture = function (object) {
    const {url, likes, comments, description} = object;
    commentsCopy = comments.slice();
    socialComments.innerHTML = ``;
    bigPicture.querySelector(`.big-picture__img img`).src = url;
    bigPicture.querySelector(`.likes-count`).textContent = likes;
    bigPicture.querySelector(`.comments-count`).textContent = comments.length;
    bigPicture.querySelector(`.social__caption`).textContent = description;
    renderSocialComments(commentsCopy);
    bigPicture.classList.remove(`hidden`);
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

  const bigPictureEscPressHandler = function (evt) {
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
    document.removeEventListener(`keydown`, bigPictureEscPressHandler);
    document.body.classList.remove(`modal-open`);
    bigPictureCancel.removeEventListener(`click`, closeButtonClickHandler);
  };

  window.bigpicture = {
    openBigPicture,
    bigPictureEscPressHandler,
    bigPicture
  };
})();

})();

(() => {
/*!**************************!*\
  !*** ./js/cardcreate.js ***!
  \**************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


(function () {

  const pictures = document.querySelector(`.pictures`);
  const filters = document.querySelector(`.img-filters`);
  const openBigPicturePopup = window.bigpicture.openBigPicture;

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

  const clickSmallPhoto = function (data) {
    const smallPhotosList = document.querySelectorAll(`.picture`);
    smallPhotosList.forEach(function (picture, index) {
      picture.addEventListener(`click`, function (evt) {
        evt.preventDefault();
        openBigPicturePopup(data[index]);
      });
    });
  };

  const successDataLoadHandler = function (data) {
    window.cardcreate.cardsList = [];
    window.cardcreate.cardsList = data;
    renderPictures(data);
    clickSmallPhoto(data);
    filters.classList.remove(`img-filters--inactive`);
  };

  window.server.load(successDataLoadHandler, errorHandler);

  window.cardcreate = {
    renderPictures,
    clickSmallPhoto
  };

})();



})();

(() => {
/*!***********************!*\
  !*** ./js/filters.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


(function () {

  const MAX_RANDOM_ELEMENTS = 10;

  const filtersForm = document.querySelector(`.img-filters__form`);
  const renderPictures = window.cardcreate.renderPictures;

  const showDefaultPictures = function () {
    const defaultPhotos = window.cardcreate.cardsList;
    renderPictures(defaultPhotos);
    window.cardcreate.clickSmallPhoto(defaultPhotos);
  };

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

  const showRandomPictures = function () {
    const picturesList = window.cardcreate.cardsList;
    const randomElements = shuffleArray(picturesList).slice(0, MAX_RANDOM_ELEMENTS);
    renderPictures(randomElements);
    window.cardcreate.clickSmallPhoto(randomElements);
  };

  const showDiscussedPictures = function () {
    const picturesListCopy = window.cardcreate.cardsList.slice();
    const sortedList = picturesListCopy.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    renderPictures(sortedList);
    window.cardcreate.clickSmallPhoto(sortedList);
  };

  const removePictures = function () {
    const pics = document.querySelectorAll(`.picture`);
    pics.forEach(function (item) {
      item.remove();
    });
  };

  const setActiveFilterBtn = function (evt) {
    const currentActive = filtersForm.querySelector(`.img-filters__button--active`);
    const {target} = evt;
    if (!target.classList.contains(`img-filters__button--active`)) {
      currentActive.classList.remove(`img-filters__button--active`);
      target.classList.add(`img-filters__button--active`);
    }
  };

  const filterClickHandler = window.timeout.debounce(function (evt) {
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
})();

})();

(() => {
/*!**************************!*\
  !*** ./js/validation.js ***!
  \**************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


(function () {

  const HASHTAGS_LENGTH = {
    min: 2,
    max: 20
  };

  const HASHTAGS_MAX = 5;
  const COMMENTS_MAX = 120;

  const hashTagsInput = document.querySelector(`.text__hashtags`);
  const pattern = /^([#]{1})([0-9a-zа-яё]{1,19})$/;
  const commentsField = document.querySelector(`.text__description`);

  const createHashTagsArray = function (hashTagsString) {
    return hashTagsString.split(` `);
  };

  const createNewHashtagsArrayWithoutSpaces = function (allHashtags) {
    const tags = allHashtags.filter((hashtag) => {
      return hashtag !== ``;
    });
    return tags;
  };

  const doValidationOfHashtags = function (arrayOfHashtags) {
    arrayOfHashtags.forEach((item, index) => { // проверяем forEach каждый элемент "чистого массива"
      const valueLength = item.length;
      if (!item.startsWith(`#`)) { // проверяем начало хэштега с #
        hashTagsInput.setCustomValidity(`Хэштег должен начиться с #`);
      } else if (valueLength < HASHTAGS_LENGTH.min) { // проверяем на min значение
        hashTagsInput.setCustomValidity(`Минимальное количество знаков 2`);
      } else if (valueLength > HASHTAGS_LENGTH.max) { // проверяем на max значение
        hashTagsInput.setCustomValidity(`Максимальное количество знаков 20`);
      } else if (!item.match(pattern)) {
        hashTagsInput.setCustomValidity(`Хэштег должен состоять только из букв и цифр`);
      } else if (arrayOfHashtags.length > HASHTAGS_MAX) {
        hashTagsInput.setCustomValidity(`Слишком много хэштегов`);
        // } else if (arrayOfHashtags.indexOf(item, index + 1) !== -1) { // проверяем на одинаковые элементы
        // hashTagsInput.setCustomValidity(`Нет 6`);
      } else {
        hashTagsInput.setCustomValidity(``);
      }
      hashTagsInput.reportValidity();
    });
    for (let i = 0; i < arrayOfHashtags.length; i++) {
      if (arrayOfHashtags[i] === arrayOfHashtags[i + 1]) {
        hashTagsInput.setCustomValidity(`Повторяющиеся хэштеги`);
      } else if (arrayOfHashtags[i] === arrayOfHashtags[i + 2]) {
        hashTagsInput.setCustomValidity(`Повторяющиеся хэштеги`);
      } else if (arrayOfHashtags[i] === arrayOfHashtags[i + 3]) {
        hashTagsInput.setCustomValidity(`Повторяющиеся хэштеги`);
      } else if (arrayOfHashtags[i] === arrayOfHashtags[i + 4]) {
        hashTagsInput.setCustomValidity(`Повторяющиеся хэштеги`);
      }
      hashTagsInput.reportValidity();
    }
    if (hashTagsInput.value === ``) {
      hashTagsInput.style.outline = `none`;
      hashTagsInput.setCustomValidity(``);
      hashTagsInput.reportValidity();
    }
  };

  const hashTagsInputKeyupHandler = function () {
    const inputValue = hashTagsInput.value.trim().toLowerCase();
    const dirtyHashTags = createHashTagsArray(inputValue);
    const cleanHashTags = createNewHashtagsArrayWithoutSpaces(dirtyHashTags);
    doValidationOfHashtags(cleanHashTags);

    if (!hashTagsInput.validity.valid) {
      hashTagsInput.style.outline = `2px solid red`;
    } else {
      hashTagsInput.style.outline = `none`;
    }
  };

  hashTagsInput.addEventListener(`keyup`, hashTagsInputKeyupHandler);

  hashTagsInput.addEventListener(`focusin`, function () {
    document.removeEventListener(`keydown`, window.modalopenclose.modalEscPressHandler);
  });

  hashTagsInput.addEventListener(`focusout`, function () {
    document.addEventListener(`keydown`, window.modalopenclose.modalEscPressHandler);
  });

  commentsField.oninput = function () {
    const valueLength = commentsField.value.length;
    if (commentsField.value.length > COMMENTS_MAX) {
      commentsField.setCustomValidity(`Удалите ` + (COMMENTS_MAX - valueLength) + ` симв.`);
    } else {
      commentsField.setCustomValidity(``);
    }
    commentsField.reportValidity();
  };

  commentsField.addEventListener(`focusin`, function () {
    document.removeEventListener(`keydown`, window.modalopenclose.modalEscPressHandler);
  });

  commentsField.addEventListener(`focusout`, function () {
    document.addEventListener(`keydown`, window.modalopenclose.modalEscPressHandler);
  });

  window.validation = {
    hashTagsInput,
    commentsField
  };

})();

})();

(() => {
/*!******************************!*\
  !*** ./js/modalopenclose.js ***!
  \******************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

(function () {

  const uploadImageFile = document.querySelector(`#upload-file`);
  const imageUploadOverlay = document.querySelector(`.img-upload__overlay`);
  const uploadCancel = document.querySelector(`#upload-cancel`);

  const modalEscPressHandler = function (evt) {
    if (evt.key === `Escape`) {
      closeModal();
      evt.preventDefault();
    }
  };

  const openModal = function () {
    imageUploadOverlay.classList.remove(`hidden`);
    document.querySelector(`body`).classList.add(`modal-open`);
    document.addEventListener(`keydown`, modalEscPressHandler);
  };

  const closeModal = function () {
    imageUploadOverlay.classList.add(`hidden`);
    document.querySelector(`body`).classList.remove(`modal-open`);
    document.removeEventListener(`keydown`, modalEscPressHandler);
    uploadImageFile.value = ``;
    window.submit.resetImageData();
  };

  uploadImageFile.addEventListener(`change`, function () {
    openModal();
  });

  uploadCancel.addEventListener(`click`, function () {
    closeModal();
  });

  window.modalopenclose = {
    modalEscPressHandler,
    uploadImageFile
  };

})();

})();

(() => {
/*!**********************!*\
  !*** ./js/submit.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
// 6.2


(function () {

  const form = document.querySelector(`.img-upload__form`);
  const imageUploadOverlay = document.querySelector(`.img-upload__overlay`);

  const resetImageData = function () {
    window.effects.setDefaultDepth();
    window.modalopenclose.uploadImageFile.value = ``;
    window.scale.imageUploadPreview.style.filter = ``;
    window.scale.imageUploadPreview.style.transform = `scale(1.00)`;
    window.scale.imageUploadPreview.className = `effects__preview--none`;
    window.effects.effectLevel.classList.add(`hidden`);
  };

  const submitHandler = function (evt) {
    window.server.upload(
        new FormData(form),
        function () {
          form.reset();
          resetImageData();
          imageUploadOverlay.classList.add(`hidden`);
          window.success.successUploadHandler();
        },
        function () {
          window.error.errorUploadHandler();
        });
    evt.preventDefault();
  };

  form.addEventListener(`submit`, submitHandler);

  window.submit = {
    resetImageData
  };

})();

})();

(() => {
/*!***********************!*\
  !*** ./js/success.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */



(function () {
  const main = document.querySelector(`main`);
  const onSuccessUpload = document.querySelector(`#success`)
  .content
  .querySelector(`.success`);

  const successElement = onSuccessUpload.cloneNode(true);
  const successInner = successElement.querySelector(`.success__inner`);
  const successButton = successElement.querySelector(`.success__button`);

  const createSuccessModule = function () {
    main.insertAdjacentElement(`afterbegin`, successElement);
    successButton.addEventListener(`click`, successButtonClickHandler);
    document.addEventListener(`click`, successWindowClickHandler);
    document.addEventListener(`keydown`, escPressHandler);
  };

  const deleteSuccessModule = function () {
    successButton.removeEventListener(`click`, successButtonClickHandler);
    document.removeEventListener(`click`, successWindowClickHandler);
    document.removeEventListener(`keydown`, escPressHandler);
    main.removeChild(successElement);
  };

  const successButtonClickHandler = function () {
    deleteSuccessModule();
  };

  const successWindowClickHandler = function (evt) {
    if (evt.target !== successInner) {
      deleteSuccessModule();
    }
  };

  const escPressHandler = function (evt) {
    if (evt.key === `Escape`) {
      deleteSuccessModule();
    }
  };

  const successUploadHandler = function () {
    createSuccessModule();
  };

  window.success = {
    successUploadHandler,
  };
})();

})();

(() => {
/*!*********************!*\
  !*** ./js/error.js ***!
  \*********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */



(function () {

  const main = document.querySelector(`main`);
  const errorUpload = document.querySelector(`#error`)
  .content
  .querySelector(`.error`);

  const errorElement = errorUpload.cloneNode(true);
  const errorButton = errorElement.querySelector(`.error__button`);
  const errorInner = errorElement.querySelector(`.error__inner`);

  const createErrorModule = function () {
    main.insertAdjacentElement(`beforeend`, errorElement);
    errorButton.addEventListener(`click`, errorButtonClickHandler);
    document.addEventListener(`click`, errorWindowClickHandler);
    document.addEventListener(`keydown`, errorEscPressHandler);
  };

  const deleteErrorModule = function () {
    main.removeChild(errorElement);
    errorButton.removeEventListener(`click`, errorButtonClickHandler);
    document.removeEventListener(`click`, errorWindowClickHandler);
    document.removeEventListener(`keydown`, errorEscPressHandler);
  };

  const errorButtonClickHandler = function () {
    deleteErrorModule();
  };

  const errorWindowClickHandler = function (evt) {
    if (evt.target !== errorInner) {
      deleteErrorModule();
    }
  };

  const errorEscPressHandler = function (evt) {
    if (evt.key === `Escape`) {
      deleteErrorModule();
    }
  };

  const errorUploadHandler = function () {
    createErrorModule();
  };

  window.error = {
    errorUploadHandler
  };

})();

})();

(() => {
/*!***********************!*\
  !*** ./js/effects.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


(function () {

  const DEFAULT_EFFECT_LEVEL = 100;

  const MaxEffectsValues = {
    chrome: 1,
    sepia: 1,
    marvin: 100,
    phobos: 3,
    heat: [1, 2],
  };

  const effects = document.querySelector(`.effects`);
  const effectLevel = document.querySelector(`.effect-level`);
  const effectLevelPin = effectLevel.querySelector(`.effect-level__pin`);
  const effectLevelLine = effectLevel.querySelector(`.effect-level__line`);
  const effectLevelDepth = effectLevel.querySelector(`.effect-level__depth`);
  const effectLevelValue = effectLevel.querySelector(`.effect-level__value`);
  const effectsItemFirst = document.querySelector(`.effects__item:first-child`);
  const effectsItem = document.querySelectorAll(`.effects__item`);
  const imgUploadEffectLevel = document.querySelector(`.img-upload__effect-level`);

  imgUploadEffectLevel.classList.add(`hidden`);

  const changeFilter = function (evt) {
    if (evt.target.matches(`input[type="radio"]`)) {
      window.scale.imageUploadPreview.className = ``;
      setDefaultDepth();
      window.scale.imageUploadPreview.className = `effects__preview--${evt.target.value}`;
    }
  };

  effects.addEventListener(`click`, changeFilter);

  const setDefaultDepth = function () {
    effectLevelPin.style.left = DEFAULT_EFFECT_LEVEL + `%`;
    effectLevelDepth.style.width = DEFAULT_EFFECT_LEVEL + `%`;
    effectLevelValue.value = DEFAULT_EFFECT_LEVEL;
    window.scale.imageUploadPreview.style.filter = ``;
  };

  const setNewEffectDepth = function (levelValue) {
    const value = levelValue / 100;

    if (window.scale.imageUploadPreview.className.match(`effects__preview--`)) {
      switch (window.scale.imageUploadPreview.className) {
        case `effects__preview--chrome`:
          window.scale.imageUploadPreview.style.filter = `grayscale(${MaxEffectsValues.chrome * value})`;
          break;
        case `effects__preview--sepia`:
          window.scale.imageUploadPreview.style.filter = `sepia(${MaxEffectsValues.sepia * value})`;
          break;
        case `effects__preview--marvin`:
          window.scale.imageUploadPreview.style.filter = `invert(${levelValue}%)`;
          break;
        case `effects__preview--phobos`:
          window.scale.imageUploadPreview.style.filter = `blur(${MaxEffectsValues.phobos * value}px)`;
          break;
        case `effects__preview--heat`:
          window.scale.imageUploadPreview.style.filter = `brightness(${MaxEffectsValues.heat[1] * value + MaxEffectsValues.heat[0]})`;
          break;
        default:
          window.scale.imageUploadPreview.style.filter = ``;
      }
    }
  };

  const effectsLevelPinMouseDownHandler = function (evt) {
    evt.preventDefault();

    const lineWidth = effectLevelLine.offsetWidth;
    let startCoordinates = evt.clientX;

    const oneEffectLevelPinMove = function (moveEvt) {
      moveEvt.preventDefault();

      const shift = startCoordinates - moveEvt.clientX;
      const pinX = effectLevelPin.offsetLeft - shift;

      startCoordinates = moveEvt.clientX;

      if (!(pinX < 0 || pinX > lineWidth)) {
        const pinPoint = pinX / lineWidth;
        effectLevelPin.style.left = pinX + `px`;
        effectLevelValue.value = Math.round(pinPoint * 100);
        effectLevelDepth.style.width = Math.round(pinPoint * 100) + `%`;
        setNewEffectDepth(effectLevelValue.value);
      }
    };

    const oneffectLevelPinMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener(`mousemove`, oneEffectLevelPinMove);
      document.removeEventListener(`mouseup`, oneffectLevelPinMouseUp);

    };

    document.addEventListener(`mousemove`, oneEffectLevelPinMove);
    document.addEventListener(`mouseup`, oneffectLevelPinMouseUp);
  };

  effectLevelPin.addEventListener(`mousedown`, effectsLevelPinMouseDownHandler);

  effectsItem.forEach(function (item) {
    item.addEventListener(`click`, function () {
      imgUploadEffectLevel.classList.remove(`hidden`);
    });
  });

  effectsItemFirst.addEventListener(`click`, function () {
    imgUploadEffectLevel.classList.add(`hidden`);
  });

  window.effects = {
    setDefaultDepth,
    effectLevel
  };

})();

})();

(() => {
/*!*********************!*\
  !*** ./js/scale.js ***!
  \*********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


(function () {

  const VALUE = {
    min: 25,
    max: 100
  };

  const scaleControlSmaller = document.querySelector(`.scale__control--smaller`);
  const scaleControlBigger = document.querySelector(`.scale__control--bigger`);
  const scaleValue = document.querySelector(`.scale__control--value`);
  const imageUploadPreview = document.querySelector(`.img-upload__preview img`);

  const clickOnMinusScale = function () {
    let scale = parseInt(scaleValue.value, 10);
    if (scale <= VALUE.max && scale > VALUE.min) {
      scale -= VALUE.min;
    }
    changeImageStyle(scale);
  };

  scaleControlSmaller.addEventListener(`click`, clickOnMinusScale);

  const clickOnPlusScale = function () {
    let scale = parseInt(scaleValue.value, 10);
    if (scale >= VALUE.min && scale < VALUE.max) {
      scale += VALUE.min;
    }
    changeImageStyle(scale);
  };

  scaleControlBigger.addEventListener(`click`, clickOnPlusScale);

  const changeImageStyle = function (number) {
    switch (number) {
      case 25:
        imageUploadPreview.style.transform = `scale(0.25)`;
        scaleValue.value = `${number}%`;
        break;
      case 50:
        imageUploadPreview.style.transform = `scale(0.50)`;
        scaleValue.value = `${number}%`;
        break;
      case 75:
        imageUploadPreview.style.transform = `scale(0.75)`;
        scaleValue.value = `${number}%`;
        break;
      case 100:
        imageUploadPreview.style.transform = `scale(1.00)`;
        scaleValue.value = `${number}%`;
        break;
    }
  };

  window.scale = {
    imageUploadPreview
  };
})();

})();

/******/ })()
;