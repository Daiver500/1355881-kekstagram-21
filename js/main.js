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

const bigPicture = document.querySelector(`.big-picture`);
const bigPictureOpened = function (mockObjectOne) {
  bigPicture.classList.remove(`hidden`);
  const {url, likes, comments, description} = mockObjectOne;
  document.querySelector(`.big-picture__img img`).src = url;
  document.querySelector(`.likes-count`).textContent = likes;
  document.querySelector(`.comments-count`).textContent = comments.length;
  document.querySelector(`.social__caption`).textContent = description;
  createSocialComment();
};
bigPictureOpened(mocks[0]);

const createSocialComment = function () {
  const socialComments = document.querySelector(`.social__comments`);
  const socialComment = socialComments.querySelector(`li`);
  const fragment = document.createDocumentFragment();
  const li = socialComment.cloneNode(true);
  socialComments.innerHTML = ``;
  fragment.append(li);

  for (let i = 0; i <= mocks.length; i++) {
    socialComments.append(fragment);
  }
};
createSocialComment();


const createComments = (card) => {
  const fragment = document.createDocumentFragment();
  const socialComments = bigPicture.querySelector(`.social__comments`);
  const comment = socialComments.querySelector(`li`);
  socialComments.innerHTML = ``;

  card.comments.forEach((item) => {
    const li = comment.cloneNode(true);
    li.querySelector(`.social__picture`).src = item.avatar;
    li.querySelector(`.social__picture`).alt = item.name;
    li.querySelector(`.social__picture`).width = AVATAR.width;
    li.querySelector(`.social__picture`).height = AVATAR.height;
    li.querySelector(`.social__text`).textContent = item.message;
    fragment.append(li);
  });
  socialComments.append(fragment);
};

// Подставляем комментарии в блок .social__comments.

// const socialComments = document.querySelector(`.social__comments`);
// const socialComment = document.createElement(`li`);
// socialComment.classList.add(`social__comment`);

// const socialCommentsImg = document.createElement(`img`);
// socialCommentsImg.classList.add(`social__picture`);
// socialCommentsImg.src = mocks[0].comments[0].avatar;
// socialCommentsImg.alt = mocks[0].comments[0].name;
// socialCommentsImg.width = AVATAR.width;
// socialCommentsImg.height = AVATAR.height;
// socialComment.append(socialCommentsImg);

// const socialCommentsText = document.createElement(`p`);
// socialCommentsText.classList.add(`social__text`);
// socialCommentsText.textContent = mocks[0].comments[0].message;
// socialComment.append(socialCommentsText);

// socialComments.append(socialComment);

// Добавляем класс hidden

const socialCommentCount = document.querySelector(`.social__comment-count`);
socialCommentCount.classList.add(`hidden`);

const commentsLoader = document.querySelector(`.comments-loader`);
commentsLoader.classList.add(`hidden`);

// Добавляем класс на body (для фиксации фона)

document.querySelector(`body`).classList.add(`modal-open`);
