"use strict";

// Константы

const OBJECTS_AMOUNT = 25;
const LIKES = {
  min: 15,
  max: 200,
};
const COMMENTS = {
  min: 5,
  max: 10,
};

const AVATAR = {
  width: 35,
  height: 25,
};

// Массив сообщений

const MESSAGES = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
];

// Массив имен

const NAMES = [
  `Вася`,
  `Петя`,
  `Аня`,
  `Юля`,
  `Лена`,
  `Кекс`
];

// Функция рандомного числа

const getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция рандомного вызова массива (сообщения, имена)

const getRandomArrayElement = function (array) {
  return array[getRandomInt(0, array.length - 1)];
};

// Функция создания массива комментариев

const createCommentsArray = function (randomAmount) {
  const resultComments = [];
  for (let i = 0; i < randomAmount; i++) {
    resultComments.push({
      avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
      message: getRandomArrayElement(MESSAGES),
      name: getRandomArrayElement(NAMES),
    });
  }
  return resultComments;
};

// Функция создания массива из 25 объектов

const createMocksArray = function (objectsAmount) {
  const resultMocks = [];
  for (let i = 1; i <= objectsAmount; i++) {
    resultMocks.push({
      url: `photos/${i}.jpg`,
      description: `photo description`,
      likes: getRandomInt(LIKES.min, LIKES.max),
      comments: createCommentsArray(getRandomInt(COMMENTS.min, COMMENTS.max)),
    });
  }
  return resultMocks;
};

const mocks = createMocksArray(OBJECTS_AMOUNT);
console.log(mocks);

// Обращение к шаблону

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

// Добавление элемента через documentFragment

const renderPictures = function () {
  const pictures = document.querySelector(`.pictures`);
  const fragment = document.createDocumentFragment();
  mocks.forEach(function (value) {
    fragment.appendChild(createCardElement(value));
  });
  pictures.appendChild(fragment);
  return fragment;
};

renderPictures(mocks);
console.log(mocks[0]);

// Убираем класс hidden
// Информация из первого элемента массива с данными:
// Подставляем url как src изображения внутри блока.big-picture__img.
// Подставляем количество лайков (likes) как текст .likes-count
// Подставляем текстовое содержание элемента .comments-count.
// Подставляем description строкой в блок .social__caption.
// Подставляем комментарии в блок .social__comments.


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
  document.querySelector(`.big-picture__img img`).src = url;
  document.querySelector(`.likes-count`).textContent = likes;
  document.querySelector(`.comments-count`).textContent = comments.length;
  document.querySelector(`.social__caption`).textContent = description;
  createSocialComment(mocks[0]);
};
bigPictureOpened(mocks[0]);

// Добавляем класс hidden

const socialCommentCount = document.querySelector(`.social__comment-count`);
socialCommentCount.classList.add(`hidden`);

const commentsLoader = document.querySelector(`.comments-loader`);
commentsLoader.classList.add(`hidden`);

// Добавляем класс на body (для фиксации фона)

document.querySelector(`body`).classList.add(`modal-open`);

// Загрузка изображения и показ формы редактирования

const uploadImageFile = document.querySelector(`#upload-file`);
const imageUploadOverlay = document.querySelector(`.img-upload__overlay`);
const uploadCancel = document.querySelector(`#upload-cancel`);

const modalEscPress = function (evt) {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closeModal();
  }
};

const openModal = function () {
  imageUploadOverlay.classList.remove(`hidden`);
  document.querySelector(`body`).classList.add(`modal-open`);
  document.addEventListener(`keydown`, modalEscPress);
};

const closeModal = function () {
  imageUploadOverlay.classList.add(`hidden`);
  document.querySelector(`body`).classList.remove(`modal-open`);
  document.removeEventListener(`keydown`, modalEscPress);
  uploadImageFile = ``;
};

uploadImageFile.addEventListener(`change`, function () {
  openModal();
});

uploadCancel.addEventListener(`click`, function () {
  closeModal();
});

const scaleControlSmaller = document.querySelector(`.scale__control--smaller`);
const scaleControlBigger = document.querySelector(`.scale__control--bigger`);
const controlValue = document.querySelector(`.scale__control--value`);

const value = {
  min: 25,
  max: 100
};

controlValue.value = value.max;

const counter = function () {
  scaleControlSmaller.addEventListener(`click`, function () {
    if (controlValue.value <= value.max && controlValue.value > value.min) {
      controlValue.value -= value.min;
    }
    imageStyleChange(imageUploadPreview.style);
  });
  scaleControlBigger.addEventListener(`click`, function () {
    if (controlValue.value >= value.min && controlValue.value < value.max) {
      controlValue.value = value.min + value.min;
    }
    imageStyleChange(imageUploadPreview.style);
  });
  return controlValue.value;
};
counter(controlValue.value);

// Не работает + по клику

const imageStyleChange = function () {
  if (controlValue.value === `25`) {
    imageUploadPreview.style.transform = `scale(0.25)`;
  }
  if (controlValue.value === `50`) {
    imageUploadPreview.style.transform = `scale(0.50)`;
  }
  if (controlValue.value === `75`) {
    imageUploadPreview.style.transform = `scale(0.75)`;
  }
  if (controlValue.value === `100`) {
    imageUploadPreview.style.transform = `scale(1.00)`;
  }
  return imageUploadPreview.style;
};

// Тут пока не понял, что надо делать кроме добавления обработчика (2.1 и 2.2.)

const imageUploadPreview = document.querySelector(`.img-upload__preview img`);
const filterInputs = document.querySelectorAll(`.effects__list`);


const filterChange = function (evt) {
  imageUploadPreview.classList.add(evt.target.???);
};

for (let i = 0; i < filterInputs.length; i++) {
  filterInputs[i].addEventListener(`change`, filterChange);
}

const effectLevelPin = document.querySelector(`.effect-level__pin`);
effectLevelPin.addEventListener(`mouseup`, function () {
});


// Валидация

const SYMBOLS_MAX = 20;
const SYMBOLS_MIN = 2;

const hashTags = /^#[a-zA-Z\d]*$/;
const hashTag = document.querySelector(`.text__hashtags`);

hashTag.addEventListener(`input`, function () {
  const valueLength = hashTag.value.length;
  if (valueLength < SYMBOLS_MIN) {
    hashTag.setCustomValidity(`Ещё ` + (SYMBOLS_MIN - valueLength) + ` симв.`);
  } else if (valueLength > SYMBOLS_MAX) {
    hashTag.setCustomValidity(`Удалите лишние ` + (valueLength - SYMBOLS_MAX) + ` симв.`);
  } else {
    hashTag.setCustomValidity(``);
  }
  if (hashTag.value !== hashTags) {
    hashTag.setCustomValidity(`Неправильно`);
  }
  hashTag.reportValidity();
});
