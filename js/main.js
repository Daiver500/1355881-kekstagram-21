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

const AVATAR_WIDTH = 35;
const AVATAR_HEIGHT = 25;

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

const bigPicture = document.querySelector(`.big-picture`);
bigPicture.classList.remove(`hidden`);

// Информация из первого элемента массива с данными:

// Подставляем url как src изображения внутри блока.big-picture__img.

const bigPictureImg = document.querySelector(`.big-picture__img`);
const image = bigPictureImg.querySelector(`img`);
image.src = mocks[0].url;

// Подставляем количество лайков (likes) как текст .likes-count

const likesCount = document.querySelector(`.likes-count`);
likesCount.textContent = mocks[0].likes;

// Подставляем текстовое содержание элемента .comments-count.

const commentsCount = document.querySelector(`.comments-count`);
commentsCount.textContent = mocks[0].comments.length;

// Подставляем комментарии в блок .social__comments.

const socialComments = document.querySelector(`.social__comments`);
const socialComment = document.createElement(`li`);
socialComment.classList.add(`social__comment`);

const socialCommentsImg = document.createElement(`img`);
socialCommentsImg.classList.add(`social__picture`);
socialCommentsImg.src = mocks[0].comments[0].avatar;
socialCommentsImg.alt = mocks[0].comments[0].name;
socialCommentsImg.width = AVATAR_WIDTH;
socialCommentsImg.height = AVATAR_HEIGHT;
socialComment.append(socialCommentsImg);

const socialCommentsText = document.createElement(`p`);
socialCommentsText.classList.add(`social__text`);
socialCommentsText.textContent = mocks[0].comments[0].message;
socialComment.append(socialCommentsText);

socialComments.append(socialComment);

// Подставляем description строкой в блок .social__caption.

const socialCaption = document.querySelector(`.social__caption`);
socialCaption.textContent = mocks[0].description;

// УДобавляем класс hidden

const socialCommentCount = document.querySelector(`.social__comment-count`);
socialCommentCount.classList.add(`hidden`);

const commentsLoader = document.querySelector(`.comments-loader`);
commentsLoader.classList.add(`hidden`);
