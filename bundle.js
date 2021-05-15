/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
(() => {
/*!**********************!*\
  !*** ./js/server.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const REFERENCE = {
  load: `https://javascript.pages.academy/kekstagram/data`,
  upload: `https://javascript.pages.academy/kekstagram`
};

const TIMEOUT_IN_MS = 10000;

const StatusCode = {
  OK: 200
};

const getServerRequest = (xhr, onSuccess, onError) => {
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    if (xhr.status === StatusCode.OK) {
      onSuccess(xhr.response);
    } else {
      onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
    }
  });
  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
  });

  xhr.timeout = TIMEOUT_IN_MS;
};

const load = (success, error) => {
  const xhr = new XMLHttpRequest();
  xhr.open(`GET`, REFERENCE.load);
  getServerRequest(xhr, success, error);
  xhr.send();
};


const upload = (data, success, error) => {
  const xhr = new XMLHttpRequest();
  xhr.open(`POST`, REFERENCE.upload);
  getServerRequest(xhr, success, error);
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
/*!****************************!*\
  !*** ./js/huge-picture.js ***!
  \****************************/
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

const createCardElement = (object) => {
  const {likes, comments, url} = object;
  const cardElement = template.cloneNode(true);
  cardElement.querySelector(`.picture__likes`).textContent = likes;
  cardElement.querySelector(`.picture__comments`).textContent = comments.length;
  cardElement.querySelector(`img`).src = url;
  return cardElement;
};

const renderPictures = (cardsArray) => {
  const fragment = document.createDocumentFragment();
  cardsArray.forEach((cardObject) => {
    fragment.appendChild(createCardElement(cardObject));
  });
  pictures.appendChild(fragment);
  return fragment;
};

const errorHandler = (errorMessage) => {
  const node = document.createElement(`div`);
  node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
  node.style.position = `absolute`;
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = `30px`;
  node.textContent = errorMessage;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

const clickSmallPhoto = (data) => {
  const smallPhotosList = document.querySelectorAll(`.picture`);
  smallPhotosList.forEach((picture, index) => {
    picture.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      openBigPicturePopup(data[index]);
    });
  });
};

const successDataLoadHandler = (data) => {
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

const showDefaultPictures = () => {
  const defaultPhotos = window.cardcreate.cardsList;
  renderPictures(defaultPhotos);
  window.cardcreate.clickSmallPhoto(defaultPhotos);
};

const shuffleArray = (photos) => {
  const photoCopies = photos.slice();
  const iterations = MAX_RANDOM_ELEMENTS < photoCopies.length ? MAX_RANDOM_ELEMENTS : photoCopies.length - 1;

  for (let i = 0; i < iterations; i++) {
    const randomIndex = Math.floor(Math.random() * (photoCopies.length - i)) + i;
    const currentElement = photoCopies[i];
    photoCopies[i] = photoCopies[randomIndex];
    photoCopies[randomIndex] = currentElement;
  }
  return photoCopies;
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

const UserMessage = {
  LESS_THEN_FIVE: `Нельзя указать больше пяти хэш-тегов`,
  NO_DUPLICATES: `Один и тот же хэш-тег не может быть использован дважды`,
  CORRECT: `Не верный формат хештега`,
};

const hashtagsInputHandler = (evt) => {
  const {target: hashtagsInput} = evt;
  const hashtagsArr = hashtagsInput.value.replace(/ +/g, ` `).trim().toLowerCase().split(` `);

  const isHashtagsLessThanFive = hashtagsArr.length <= HASHTAGS_MAX_COUNT;

  const isHashtagCorrect = hashtagsArr.every((tag) => {
    return HASHTAG_REG_EXP.test(tag);
  });

  const isHastagsNoDuplicates = hashtagsArr.every((item, index, hashtags) => {
    return hashtags.indexOf(item) === index;
  });

  hashtagsInput.setCustomValidity(``);

  if (!isHashtagsLessThanFive) {
    hashtagsInput.setCustomValidity(UserMessage.LESS_THEN_FIVE);
  }

  if (!isHashtagCorrect) {
    hashtagsInput.setCustomValidity(UserMessage.CORRECT);
  }

  if (!isHastagsNoDuplicates) {
    hashtagsInput.setCustomValidity(UserMessage.NO_DUPLICATES);
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

const commentsInputHandler = (evt) => {
  const {target: commentsField} = evt;
  const valueLength = commentsField.value.length;
  if (commentsField.value.length > COMMENTS_MAX) {
    commentsField.setCustomValidity(`Удалите ` + (COMMENTS_MAX - valueLength) + ` симв.`);
  } else {
    commentsField.setCustomValidity(``);
  }
  commentsField.reportValidity();

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

const resetImageData = () => {
  window.effects.setDefaultDepth();
  window.popup.uploadImageFile.value = ``;
  window.scale.imageUploadPreview.style.filter = ``;
  window.scale.imageUploadPreview.style.transform = `scale(1.00)`;
  window.scale.imageUploadPreview.className = `effects__preview--none`;
  window.effects.effectLevel.classList.add(`hidden`);
};

const formSendingHandler = (evt) => {
  window.server.upload(
      new FormData(form),
      () => {
        form.reset();
        resetImageData();
        imageUploadOverlay.classList.add(`hidden`);
        window.success.fortunateUploadHandler();
      },
      () => {
        window.mistake.errorUploadHandler();
      });
  evt.preventDefault();
};

window.submit = {
  formSendingHandler,
  resetImageData
};

})();

(() => {
/*!*********************!*\
  !*** ./js/popup.js ***!
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

const modalEscPressHandler = (evt) => {
  if (evt.key === `Escape`) {
    closeModal();
    evt.preventDefault();
  }
};

const openModal = () => {
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

const closeModal = () => {
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

const hashtagFocusInHandler = () => {
  document.removeEventListener(`keydown`, modalEscPressHandler);
};

const hashtagFocusOutHandler = () => {
  document.addEventListener(`keydown`, modalEscPressHandler);
};

const commentsFocusInHandler = () => {
  document.removeEventListener(`keydown`, modalEscPressHandler);
};

const commentsFocusOutHandler = () => {
  document.addEventListener(`keydown`, modalEscPressHandler);
};

const openModalHandler = () => {
  openModal();
};

const modalCloseBtnClickHandler = () => {
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

const setEffectsPreview = (customImage) => {
  effectsPreview.forEach((preview) => {
    preview.style = `background-image: url('${customImage}')`;
  });
};

fileChooser.addEventListener(`change`, () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();


  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (!matches) {
    window.mistake.errorUploadHandler(`Недопустимый формат`);
    window.popup.imageUploadOverlay.classList.add(`hidden`);
    window.submit.resetImageData();
  }

  const reader = new FileReader();
  reader.addEventListener(`load`, () => {
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

const createSuccessModule = () => {
  closeModal();
  main.insertAdjacentElement(`afterbegin`, successElement);
  successButton.addEventListener(`click`, successButtonClickHandler);
  document.addEventListener(`click`, successWindowClickHandler);
  document.addEventListener(`keydown`, escPressHandler);
};

const deleteSuccessModule = () => {
  successButton.removeEventListener(`click`, successButtonClickHandler);
  document.removeEventListener(`click`, successWindowClickHandler);
  document.removeEventListener(`keydown`, escPressHandler);
  main.removeChild(successElement);
};

const successButtonClickHandler = () => {
  deleteSuccessModule();
};

const successWindowClickHandler = (evt) => {
  if (evt.target !== successInner) {
    deleteSuccessModule();
  }
};

const escPressHandler = (evt) => {
  if (evt.key === `Escape`) {
    deleteSuccessModule();
  }
};

const fortunateUploadHandler = () => {
  createSuccessModule();
};

window.success = {
  fortunateUploadHandler,
};

})();

(() => {
/*!***********************!*\
  !*** ./js/mistake.js ***!
  \***********************/
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

const createErrorModule = (errorText) => {
  if (errorText) {
    errorTitle.textContent = errorText;
  }
  main.insertAdjacentElement(`beforeend`, errorElement);
  errorButton.addEventListener(`click`, errorButtonClickHandler);
  document.addEventListener(`click`, errorWindowClickHandler);
  document.addEventListener(`keydown`, errorEscPressHandler);
};

const deleteErrorModule = () => {
  main.removeChild(errorElement);
  errorButton.removeEventListener(`click`, errorButtonClickHandler);
  document.removeEventListener(`click`, errorWindowClickHandler);
  document.removeEventListener(`keydown`, errorEscPressHandler);
};

const errorButtonClickHandler = () => {
  deleteErrorModule();
};

const errorWindowClickHandler = (evt) => {
  if (evt.target !== errorInner) {
    deleteErrorModule();
  }
};

const errorEscPressHandler = (evt) => {
  if (evt.key === `Escape`) {
    deleteErrorModule();
  }
};

const errorUploadHandler = (errorText = false) => {
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
const effectsItemDefault = document.querySelector(`.effects__item:first-child`);
const effectsItem = document.querySelectorAll(`.effects__item`);
const imgUploadEffectLevel = document.querySelector(`.img-upload__effect-level`);

imgUploadEffectLevel.classList.add(`hidden`);

const changeFilterHandler = (evt) => {
  if (evt.target.matches(`input[type="radio"]`)) {
    window.scale.imageUploadPreview.className = ``;
    setDefaultDepth();
    window.scale.imageUploadPreview.className = `effects__preview--${evt.target.value}`;
    window.scale.imageUploadPreview.style.transform = `scale(1.00)`;
    window.scale.counterValue.value = `${100}%`;
  }
};

effects.addEventListener(`click`, changeFilterHandler);

const setDefaultDepth = () => {
  effectLevelPin.style.left = DEFAULT_EFFECT_LEVEL + `%`;
  effectLevelDepth.style.width = DEFAULT_EFFECT_LEVEL + `%`;
  effectLevelValue.value = DEFAULT_EFFECT_LEVEL;
  window.scale.imageUploadPreview.style.filter = ``;
};

const setNewEffectDepth = (levelValue) => {
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

const effectsLevelPinMouseDownHandler = (evt) => {
  evt.preventDefault();

  const lineWidth = effectLevelLine.offsetWidth;
  let startCoordinates = evt.clientX;

  const oneEffectLevelPinMoveHandler = (moveEvt) => {
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

  const oneEffectLevelPinMouseUpHandler = (upEvt) => {
    upEvt.preventDefault();
    document.removeEventListener(`mousemove`, oneEffectLevelPinMoveHandler);
    document.removeEventListener(`mouseup`, oneEffectLevelPinMouseUpHandler);

  };

  document.addEventListener(`mousemove`, oneEffectLevelPinMoveHandler);
  document.addEventListener(`mouseup`, oneEffectLevelPinMouseUpHandler);
};

effectLevelPin.addEventListener(`mousedown`, effectsLevelPinMouseDownHandler);

effectsItem.forEach((item) => {
  item.addEventListener(`click`, () => {
    imgUploadEffectLevel.classList.remove(`hidden`);
  });
});

effectsItemDefault.addEventListener(`click`, () => {
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


const Value = {
  MIN: 25,
  MAX: 100
};

const scaleControlSmaller = document.querySelector(`.scale__control--smaller`);
const scaleControlBigger = document.querySelector(`.scale__control--bigger`);
const counterValue = document.querySelector(`.scale__control--value`);
const imageUploadPreview = document.querySelector(`.img-upload__preview img`);

const clickOnMinusScaleHandler = () => {
  let scale = parseInt(counterValue.value, 10);
  if (scale <= Value.MAX && scale > Value.MIN) {
    scale -= Value.MIN;
  }
  changeImageStyle(scale);
};

scaleControlSmaller.addEventListener(`click`, clickOnMinusScaleHandler);

const clickOnPlusScaleHandler = () => {
  let scale = parseInt(counterValue.value, 10);
  if (scale >= Value.MIN && scale < Value.MAX) {
    scale += Value.MIN;
  }
  changeImageStyle(scale);
};

scaleControlBigger.addEventListener(`click`, clickOnPlusScaleHandler);

const changeImageStyle = (number) => {
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