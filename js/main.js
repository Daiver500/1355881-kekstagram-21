"use strict";

// Функция рандомного числа
const OBJECTS_AMOUNT = 25;
const LIKES = {
  min: 15,
  max: 200,
}
const COMMENTS = {
  min: 3,
  max: 10,
}

const getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция рандомного вызова массива (сообщения, аватары, имена)

const getRandomArrayElement = function(array) {
  return array[getRandomInt(0, array.length - 1)];
}

// Массив сообщений

const messages = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
];

// Массив имен

const names = [`Вася`, `Петя`, `Аня`, `Юля`, `Лена`, `Кекс`];

// Массив аватар

const avatars = [`img/avatar-1.svg`, `img/avatar-2.svg`, `img/avatar-3.svg`, `img/avatar-4.svg`, `img/avatar-5.svg`, `img/avatar-6.svg`];

// Функция создания комментария

const createCommentsArray = function (amount) {
  let resultComments = [];
  for (let i = 0; i <= amount; i++) {
    resultComments.push({
      avatar: `img/avatar-${getRandomInt(1,6)}.svg`,
      message: getRandomArrayElement(messages),
      name: getRandomArrayElement(names),
    });
  }
  return resultComments;
};

// Функция создания массива из 25 объектов

const createMocksArray = function (amount) {
  const photoDescription = [];
  for (let i = 1; i <= amount; i++) {
    photoDescription.push({
      url: `photos/${i}.jpg`,
      description: `photo description`,
      likes: getRandomInt(LIKES.min, LIKES.max),
      comments: createCommentsArray(getRandomInt(COMMENTS.min, COMMENTS.max)),
    });
  }
  return photoDescription;
};

const mocks = createMocksArray(OBJECTS_AMOUNT);
console.log(mocks);

// Обращение к шаблону

const template = document.querySelector(`#picture`)
.content
.querySelector(`.picture`);
console.log(template);

// Создание фукнции на основе шаблона

const createCardElement = function (object) {
  const element = template.cloneNode(true);

  element.querySelector(`.picture__likes`).textContent = object.likes;
  element.querySelector(`.picture__comments`).textContent = ``;
  element.querySelector(`img`).src = object.url;
  return element;
};

// Добавление элемента через documentFragment

const pictures = document.querySelector(`.pictures`);
const fragment = document.createDocumentFragment();
mocks.forEach((object) => {
  fragment.append(createCardElement(object));
})
pictures.appendChild(fragment);

// Цикл для добавления элементов через documentFragment ???

/** const pictures = document.querySelector(`.pictures`);
const fragment = document.createDocumentFragment();
for (let i = 0; i < photoDescription.length; i++) {
  fragment.appendChild(createCardElement());
}
pictures.appendChild(fragment);**/
