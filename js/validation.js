"use strict";

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

  const isHastagsNoDuplicates = hashtagsArr.every((item, index, arrayOfHashtags) => {
    return arrayOfHashtags.indexOf(item) === index;
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

