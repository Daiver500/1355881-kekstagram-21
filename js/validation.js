"use strict";

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
    arrayOfHashtags.forEach(function (item, index) { // проверяем forEach каждый элемент "чистого массива"
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
      // hashTagsInput.reportValidity();
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
      // hashTagsInput.reportValidity();
    }
    if (hashTagsInput.value === ``) {
      hashTagsInput.style.outline = `none`;
      hashTagsInput.setCustomValidity(``);
    }

    if (!hashTagsInput.validity.valid) {
      hashTagsInput.style.outline = `2px solid red`;
    } else {
      hashTagsInput.style.outline = `none`;
    }
    hashTagsInput.reportValidity();
  };


  const hashTagsInputKeyupHandler = function () {
    const inputValue = hashTagsInput.value.trim().toLowerCase();
    const dirtyHashTags = createHashTagsArray(inputValue);
    const cleanHashTags = createNewHashtagsArrayWithoutSpaces(dirtyHashTags);
    doValidationOfHashtags(cleanHashTags);
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
