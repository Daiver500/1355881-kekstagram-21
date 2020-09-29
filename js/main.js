"use strict";

// Функция рандомного числа

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция рандомного вызова массива (сообщения, аватары, имена)

function random(value) {
  return value[getRandom(0, value.length - 1)];
}

// Массив сообщений

const messages = [`Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`];

// Массив имен

const names = [`Вася`, `Петя`, `Аня`, `Юля`, `Лена`, `Кекс`];

// Массив аватар

const avatars = [`img/avatar-1.svg`, `img/avatar-2.svg`, `img/avatar-3.svg`, `img/avatar-4.svg`, `img/avatar-5.svg`, `img/avatar-6.svg`];

// Функция создания комментария

const createCommentsArray = function (amount) {
  const resultComments = [];
  for (let i = 0; i <= amount; i++) {
    resultComments.push({
      avatar: random(avatars),
      message: random(messages),
      name: random(names),
    });
  }
  return resultComments;
};

// Функция создания массива из 25 объектов

const createDescription = function (objects) {
  let photoDescription = [];
  for (let i = 0; i <= objects; i++) {
    photoDescription.push({
      url: `photos/${i}.jpg`,
      description: `Фото`,
      likes: getRandom(15, 200),
      comments: createCommentsArray(0),
    });
  }
  return photoDescription;
};

createDescription(25);

// Обращение к шаблону

let template = document.querySelector(`#picture`)
.content
.querySelector(`.picture`);

// Создание фукнции на основе шаблона

let cardCreate = function () {
  let element = template.cloneNode(true);

  element.querySelector(`picture__likes`).textContent = getRandom(15, 200);
  element.querySelector(`picture__comments`).textContent = random(messages);
  element.querySelector(`img`).src = createDescription.url;
  return element;
};

// Добавление элемента через documentFragment

let pictures = document.querySelector(`.pictures`);
let fragment = document.createDocumentFragment();
fragment.appendChild(cardCreate());
pictures.appendChild(fragment);

// Цикл для добавления элементов через documentFragment ???

/** let pictures = document.querySelector(`.pictures`);
let fragment = document.createDocumentFragment();
for (var i = 0; i < photoDescription.length; i++) {
  fragment.appendChild(cardCreate());
}
pictures.appendChild(fragment);**/
