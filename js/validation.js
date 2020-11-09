"use strict";


const HASHTAGS_MAX_COUNT = 5;
const HASHTAG_REG_EXP = /^#([а-яА-Я]|[a-zA-Z]|[0-9]){1,20}$/;

const USER_MESSAGE = {
  LESS_THEN_FIVE: `Нельзя указать больше пяти хэш-тегов`,
  NO_DUPLICATES: `Один и тот же хэш-тег не может быть использован дважды`,
  CORRECT: `Не верный формат хештега`,
};

const inputHashtags = document.querySelector(`.text__hashtags`);

const onInputHashtagsKeyup = function () {
  const hashtagsArr = inputHashtags.value.replace(/ +/g, ` `).trim().toLowerCase().split(` `);
  console.log(hashtagsArr);

  const isHashtagsLessThanFive = hashtagsArr.length <= HASHTAGS_MAX_COUNT;

  const isHashtagCorrect = hashtagsArr.every(function (tag) {
    console.log(`isHashRegExp`);
    if (hashtagsArr[0] !== ``) {
      HASHTAG_REG_EXP.test(tag);
    }
  });

  const isHastagsNoDuplicates = hashtagsArr.every(function (item, index, array) {
    console.log(`NoDuplicates`);
    if (hashtagsArr[0] !== ``) {
      return array.indexOf(item) === index;
    }
    return array.indexOf(item) === index;
  });

  inputHashtags.setCustomValidity(``);

  if (!isHashtagsLessThanFive) {
    inputHashtags.setCustomValidity(USER_MESSAGE.LESS_THEN_FIVE);
  }

  if (!isHashtagCorrect) {
    inputHashtags.setCustomValidity(USER_MESSAGE.CORRECT);
  }

  if (!isHastagsNoDuplicates) {
    inputHashtags.setCustomValidity(USER_MESSAGE.NO_DUPLICATES);
  }
  inputHashtags.reportValidity();

  if ((isHashtagCorrect && isHastagsNoDuplicates && isHashtagsLessThanFive) || inputHashtags.value === ``) {
    inputHashtags.style.outline = ``;
    inputHashtags.style.background = ``;
  } else {
    inputHashtags.style.outline = `2px solid red`;
    inputHashtags.style.background = `pink`;
  }
};

inputHashtags.addEventListener(`input`, onInputHashtagsKeyup);

// window.validation = {
//   hashTagsInput,
//   commentsField
// };


