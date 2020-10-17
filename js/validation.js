"use strict";

(function () {
// Валидация поля для хэштегов

  // 1.Описать константы

  const HASHTAGS_LENGTH = {
    min: 2,
    max: 20
  };

  const HASHTAGS_MAX = 5;
  const COMMENTS_MAX = 120;

  const hashTagsInput = document.querySelector(`.text__hashtags`);
  const pattern = /^([#]{1})([0-9a-zа-яё]{1,19})$/;
  // /^([#]{1})([0-9a-zа-яё]{1,19})$/;

  // 2.Написать функцию получения хэштегов
  const createHashTagsArray = function (hashTagsString) {
    return hashTagsString.split(` `);
  };

  // 3.Написать функцию уборки  пробелов в новом массиве
  const createNewHashtagsArrayWithoutSpaces = function (allHashtags) {
    const tags = allHashtags.filter((hashtag) => {
      return hashtag !== ``;
    });
    return tags;
  };

  // 4.Функция валидации
  const doValidationOfHashtags = function (arrayOfHashtags) {
    arrayOfHashtags.forEach((item, index) => { // проверяем forEach каждый элемент "чистого массива"
      const valueLength = item.length;
      console.log(arrayOfHashtags.indexOf(item, index + 1) !== -1);
      if (!item.startsWith(`#`)) { // проверяем начало хэштега с #
        hashTagsInput.setCustomValidity(`Нет 3`);
      } else if (valueLength < HASHTAGS_LENGTH.min) { // проверяем на min значение
        hashTagsInput.setCustomValidity(`Нет 4`);
      } else if (valueLength > HASHTAGS_LENGTH.max) { // проверяем на max значение
        hashTagsInput.setCustomValidity(`Нет 5`);
      } else if (!item.match(pattern)) {
        hashTagsInput.setCustomValidity(`Нет 2`);
      } else if (arrayOfHashtags.length > HASHTAGS_MAX) {
        hashTagsInput.setCustomValidity(`Нет 1`);
        // } else if (arrayOfHashtags.indexOf(item, index + 1) !== -1) { // проверяем на одинаковые элементы
      // hashTagsInput.setCustomValidity(`Нет 6`);
      } else {
        hashTagsInput.setCustomValidity(``);
      }
      hashTagsInput.reportValidity();
    });
    for (let i = 0; i < arrayOfHashtags.length; i++) {
      if (arrayOfHashtags[i] === arrayOfHashtags[i + 1]) {
        hashTagsInput.setCustomValidity(`Нет 6`);
      } else if (arrayOfHashtags[i] === arrayOfHashtags[i + 2]) {
        hashTagsInput.setCustomValidity(`Нет 7`);
      } else if (arrayOfHashtags[i] === arrayOfHashtags[i + 3]) {
        hashTagsInput.setCustomValidity(`Нет 8`);
      } else if (arrayOfHashtags[i] === arrayOfHashtags[i + 4]) {
        hashTagsInput.setCustomValidity(`Нет 9`);
      }
      hashTagsInput.reportValidity();
    }
  };

  // 5.Функция обработчик

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
    document.removeEventListener(`keydown`, window.modalopenclose.modalEscPress);
  });

  hashTagsInput.addEventListener(`focusout`, function () {
    document.addEventListener(`keydown`, window.modalopenclose.modalEscPress);
  });

  // Поле ввода комментария

  const commentsField = document.querySelector(`.text__description`);
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
    document.removeEventListener(`keydown`, window.modalopenclose.modalEscPress);
  });

  commentsField.addEventListener(`focusout`, function () {
    document.addEventListener(`keydown`, window.modalopenclose.modalEscPress);
  });
})();
