/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
(() => {
/*!**********************!*\
  !*** ./js/server.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */



const REFERENCE = {
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
  xhr.open(`GET`, REFERENCE.load);
  server(xhr, success, error);
  xhr.send();
};


const upload = function (data, success, error) {
  const xhr = new XMLHttpRequest();
  xhr.open(`POST`, REFERENCE.upload);
  server(xhr, success, error);
  xhr.send(data);
};

window.server = {
  load,
  upload
};



})();

(() => {
/*!***********************!*\
  !*** ./js/timeout.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */



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

(() => {
/*!***************************!*\
  !*** ./js/big-picture.js ***!
  \***************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */



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
  return comments;
};

const moreCommentsBtnClickHandler = function () {
  const comments = renderSocialComments(commentsCopy);
  currentCommentsCount.textContent = Number(currentCommentsCount.textContent) + comments.length;

  if (commentsCopy.length === 0) {
    commentsLoader.classList.add(`hidden`);
    commentsLoader.removeEventListener(`click`, moreCommentsBtnClickHandler);
  }
};

const openBigPicture = function (object) {
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

window.hugepicture = {
  openBigPicture,
  bigPictureEscPressHandler,
  bigPicture
};


})();

(() => {
/*!**************************!*\
  !*** ./js/cardcreate.js ***!
  \**************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */



const pictures = document.querySelector(`.pictures`);
const filters = document.querySelector(`.img-filters`);
const openBigPicturePopup = window.hugepicture.openBigPicture;

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

(() => {
/*!***********************!*\
  !*** ./js/filters.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */



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

(() => {
/*!**************************!*\
  !*** ./js/validation.js ***!
  \**************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */



const HASHTAGS_MAX_COUNT = 5;
const COMMENTS_MAX = 140;
const HASHTAG_REG_EXP = /^#([а-яА-Я]|[a-zA-Z]|[0-9]){1,20}$/;

const USER_MESSAGE = {
  LESS_THEN_FIVE: `Нельзя указать больше пяти хэш-тегов`,
  NO_DUPLICATES: `Один и тот же хэш-тег не может быть использован дважды`,
  CORRECT: `Не верный формат хештега`,
};

// const hashtagsInput = document.querySelector(`.text__hashtags`);
// const commentsField = document.querySelector(`.text__description`);

const hashtagsInputHandler = function (evt) {
  const {target: hashtagsInput} = evt;
  const hashtagsArr = hashtagsInput.value.replace(/ +/g, ` `).trim().toLowerCase().split(` `);

  const isHashtagsLessThanFive = hashtagsArr.length <= HASHTAGS_MAX_COUNT;

  const isHashtagCorrect = hashtagsArr.every(function (tag) {
    return HASHTAG_REG_EXP.test(tag);
  });

  const isHastagsNoDuplicates = hashtagsArr.every(function (item, index, array) {
    return array.indexOf(item) === index;
  });

  hashtagsInput.setCustomValidity(``);

  if (!isHashtagsLessThanFive) {
    hashtagsInput.setCustomValidity(USER_MESSAGE.LESS_THEN_FIVE);
  }

  if (!isHashtagCorrect) {
    hashtagsInput.setCustomValidity(USER_MESSAGE.CORRECT);
  }

  if (!isHastagsNoDuplicates) {
    hashtagsInput.setCustomValidity(USER_MESSAGE.NO_DUPLICATES);
  }
  hashtagsInput.reportValidity();

  if (hashtagsInput.value === ``) {
    hashtagsInput.setCustomValidity(``);
  }

  if ((isHashtagCorrect && isHastagsNoDuplicates && isHashtagsLessThanFive) || hashtagsInput.value === ``) {
    hashtagsInput.style.outline = ``;
    hashtagsInput.style.background = ``;
  } else {
    hashtagsInput.style.outline = `2px solid red`;
    hashtagsInput.style.background = `pink`;
  }
};

const commentsInputHandler = function (evt) {
  const {target: commentsField} = evt;
  commentsField.oninput = function () {
    const valueLength = commentsField.value.length;
    if (commentsField.value.length > COMMENTS_MAX) {
      commentsField.setCustomValidity(`Удалите ` + (COMMENTS_MAX - valueLength) + ` симв.`);
    } else {
      commentsField.setCustomValidity(``);
    }
    commentsField.reportValidity();
  };
};

window.validation = {
  hashtagsInputHandler,
  commentsInputHandler
};


})();

(() => {
/*!**********************!*\
  !*** ./js/submit.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */



const form = document.querySelector(`.img-upload__form`);
const imageUploadOverlay = document.querySelector(`.img-upload__overlay`);

const resetImageData = function () {
  window.effects.setDefaultDepth();
  window.popup.uploadImageFile.value = ``;
  window.scale.imageUploadPreview.style.filter = ``;
  window.scale.imageUploadPreview.style.transform = `scale(1.00)`;
  window.scale.imageUploadPreview.className = `effects__preview--none`;
  window.effects.effectLevel.classList.add(`hidden`);
};

const formSendingHandler = function (evt) {
  window.server.upload(
      new FormData(form),
      function () {
        form.reset();
        resetImageData();
        imageUploadOverlay.classList.add(`hidden`);
        window.success.fortunateUploadHandler();
      },
      function () {
        window.mistake.errorUploadHandler();
      });
  evt.preventDefault();
};

// form.addEventListener(`submit`, submitHandler);

window.submit = {
  formSendingHandler,
  resetImageData
};

})();

(() => {
/*!*********************!*\
  !*** ./js/modal.js ***!
  \*********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const uploadImageFile = document.querySelector(`#upload-file`);
const uploadForm = document.querySelector(`.img-upload__form`);
const imageUploadOverlay = uploadForm.querySelector(`.img-upload__overlay`);
const modalCloseBtn = imageUploadOverlay.querySelector(`#upload-cancel`);
const formSendingHandler = window.submit.formSendingHandler;
const hashtagsInput = imageUploadOverlay.querySelector(`.text__hashtags`);
const hashtagsInputHandler = window.validation.hashtagsInputHandler;
const commentsInput = imageUploadOverlay.querySelector(`.text__description`);
const commentsInputHandler = window.validation.commentsInputHandler;

const modalEscPressHandler = function (evt) {
  if (evt.key === `Escape`) {
    closeModal();
    evt.preventDefault();
  }
};

const openModal = function () {
  imageUploadOverlay.classList.remove(`hidden`);
  document.querySelector(`body`).classList.add(`modal-open`);
  hashtagsInput.addEventListener(`input`, hashtagsInputHandler);
  hashtagsInput.addEventListener(`focusin`, hashtagFocusInHandler);
  hashtagsInput.addEventListener(`focusout`, hashtagFocusOutHandler);
  commentsInput.addEventListener(`input`, commentsInputHandler);
  commentsInput.addEventListener(`focusin`, commentsFocusInHandler);
  commentsInput.addEventListener(`focusout`, commentsFocusOutHandler);
  uploadForm.addEventListener(`submit`, formSendingHandler);
  modalCloseBtn.addEventListener(`click`, modalCloseBtnClickHandler);
  document.addEventListener(`keydown`, modalEscPressHandler);
};

const closeModal = function () {
  imageUploadOverlay.classList.add(`hidden`);
  document.querySelector(`body`).classList.remove(`modal-open`);
  hashtagsInput.removeEventListener(`input`, hashtagsInputHandler);
  hashtagsInput.removeEventListener(`focusin`, hashtagFocusInHandler);
  hashtagsInput.removeEventListener(`focusout`, hashtagFocusOutHandler);
  commentsInput.removeEventListener(`input`, commentsInputHandler);
  commentsInput.removeEventListener(`focusin`, commentsFocusInHandler);
  commentsInput.removeEventListener(`focusout`, commentsFocusOutHandler);
  uploadForm.removeEventListener(`submit`, formSendingHandler);
  modalCloseBtn.removeEventListener(`click`, modalCloseBtnClickHandler);
  document.removeEventListener(`keydown`, modalEscPressHandler);
  window.submit.resetImageData();
  uploadForm.reset();
  hashtagsInput.style.outline = ``;
  hashtagsInput.style.background = ``;
};

const hashtagFocusInHandler = function () {
  document.removeEventListener(`keydown`, modalEscPressHandler);
};

const hashtagFocusOutHandler = function () {
  document.addEventListener(`keydown`, modalEscPressHandler);
};

const commentsFocusInHandler = function () {
  document.removeEventListener(`keydown`, modalEscPressHandler);
};

const commentsFocusOutHandler = function () {
  document.addEventListener(`keydown`, modalEscPressHandler);
};

const openModalHandler = function () {
  openModal();
};

const modalCloseBtnClickHandler = function () {
  closeModal();
};

window.popup = {
  openModalHandler,
  modalCloseBtnClickHandler,
  closeModal,
  uploadImageFile,
  imageUploadOverlay
};


})();

(() => {
/*!****************************!*\
  !*** ./js/photoloading.js ***!
  \****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */



const FILE_TYPES = [`jpg`, `jpeg`, `png`];
const imgUpload = document.querySelector(`.img-upload`);
const fileChooser = imgUpload.querySelector(`.img-upload__start input[type=file]`);
const previewImg = imgUpload.querySelector(`.img-upload__preview img`);
const effectsPreview = imgUpload.querySelectorAll(`.effects__preview`);
const openModal = window.popup.openModalHandler;

const setEffectsPreview = function (customImage) {
  effectsPreview.forEach(function (preview) {
    preview.style = `background-image: url('${customImage}')`;
  });
};

fileChooser.addEventListener(`change`, function () {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();


  const matches = FILE_TYPES.some(function (it) {
    return fileName.endsWith(it);
  });

  if (!matches) {
    window.mistake.errorUploadHandler(`Недопустимый формат`);
    window.popup.imageUploadOverlay.classList.add(`hidden`);
    window.submit.resetImageData();
  }

  const reader = new FileReader();
  reader.addEventListener(`load`, function () {
    openModal();
    const image = reader.result;
    previewImg.src = image;
    setEffectsPreview(image);
  });
  reader.readAsDataURL(file);
});


})();

(() => {
/*!***********************!*\
  !*** ./js/success.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */



const main = document.querySelector(`main`);
const onSuccessUpload = document.querySelector(`#success`)
  .content
  .querySelector(`.success`);

const successElement = onSuccessUpload.cloneNode(true);
const successInner = successElement.querySelector(`.success__inner`);
const successButton = successElement.querySelector(`.success__button`);
const closeModal = window.popup.closeModal;

const createSuccessModule = function () {
  closeModal();
  main.insertAdjacentElement(`afterbegin`, successElement);
  successButton.addEventListener(`click`, successButtonClickHandler);
  document.addEventListener(`click`, successWindowClickHandler);
  document.addEventListener(`keydown`, EscPressHandler);
};

const deleteSuccessModule = function () {
  successButton.removeEventListener(`click`, successButtonClickHandler);
  document.removeEventListener(`click`, successWindowClickHandler);
  document.removeEventListener(`keydown`, EscPressHandler);
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

const EscPressHandler = function (evt) {
  if (evt.key === `Escape`) {
    deleteSuccessModule();
  }
};

const fortunateUploadHandler = function () {
  createSuccessModule();
};

window.success = {
  fortunateUploadHandler,
};

})();

(() => {
/*!*********************!*\
  !*** ./js/error.js ***!
  \*********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */




const main = document.querySelector(`main`);
const errorUpload = document.querySelector(`#error`)
  .content
  .querySelector(`.error`);

const errorElement = errorUpload.cloneNode(true);
const errorButton = errorElement.querySelector(`.error__button`);
const errorInner = errorElement.querySelector(`.error__inner`);
const errorTitle = errorElement.querySelector(`.error__title`);

const createErrorModule = function (errorText) {
  if (errorText) {
    errorTitle.textContent = errorText;
  }
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

const errorUploadHandler = function (errorText = false) {
  createErrorModule(errorText);
};

window.mistake = {
  errorUploadHandler
};


})();

(() => {
/*!***********************!*\
  !*** ./js/effects.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */



const DEFAULT_EFFECT_LEVEL = 100;

const MAX_EFFECTS_VALUES = {
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
    window.scale.imageUploadPreview.style.transform = `scale(1.00)`;
    window.scale.counterValue.value = `${100}%`;
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
        window.scale.imageUploadPreview.style.filter = `grayscale(${MAX_EFFECTS_VALUES.chrome * value})`;
        break;
      case `effects__preview--sepia`:
        window.scale.imageUploadPreview.style.filter = `sepia(${MAX_EFFECTS_VALUES.sepia * value})`;
        break;
      case `effects__preview--marvin`:
        window.scale.imageUploadPreview.style.filter = `invert(${levelValue}%)`;
        break;
      case `effects__preview--phobos`:
        window.scale.imageUploadPreview.style.filter = `blur(${MAX_EFFECTS_VALUES.phobos * value}px)`;
        break;
      case `effects__preview--heat`:
        window.scale.imageUploadPreview.style.filter = `brightness(${MAX_EFFECTS_VALUES.heat[1] * value + MAX_EFFECTS_VALUES.heat[0]})`;
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

  const oneEffectLevelPinMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener(`mousemove`, oneEffectLevelPinMove);
    document.removeEventListener(`mouseup`, oneEffectLevelPinMouseUp);

  };

  document.addEventListener(`mousemove`, oneEffectLevelPinMove);
  document.addEventListener(`mouseup`, oneEffectLevelPinMouseUp);
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

(() => {
/*!*********************!*\
  !*** ./js/scale.js ***!
  \*********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */



const VALUE = {
  min: 25,
  max: 100
};

const scaleControlSmaller = document.querySelector(`.scale__control--smaller`);
const scaleControlBigger = document.querySelector(`.scale__control--bigger`);
const counterValue = document.querySelector(`.scale__control--value`);
const imageUploadPreview = document.querySelector(`.img-upload__preview img`);

const clickOnMinusScale = function () {
  let scale = parseInt(counterValue.value, 10);
  if (scale <= VALUE.max && scale > VALUE.min) {
    scale -= VALUE.min;
  }
  changeImageStyle(scale);
};

scaleControlSmaller.addEventListener(`click`, clickOnMinusScale);

const clickOnPlusScale = function () {
  let scale = parseInt(counterValue.value, 10);
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
      counterValue.value = `${number}%`;
      break;
    case 50:
      imageUploadPreview.style.transform = `scale(0.50)`;
      counterValue.value = `${number}%`;
      break;
    case 75:
      imageUploadPreview.style.transform = `scale(0.75)`;
      counterValue.value = `${number}%`;
      break;
    case 100:
      imageUploadPreview.style.transform = `scale(1.00)`;
      counterValue.value = `${number}%`;
      break;
  }
};

window.scale = {
  imageUploadPreview,
  counterValue
};


})();

/******/ })()
;
