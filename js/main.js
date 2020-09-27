"use strict";

// Рандом

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция рандомного вызова сообщения

function randomMessages(messages) {
  return messages[getRandomInt(0, messages.length - 1)];
}

const messages = [`Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`];

// Функция рандомного вызова имени

function randomNames(names) {
  return names[getRandomInt(0, names.length - 1)];
}

const names = [`Вася`, `Петя`, `Аня`, `Юля`, `Лена`, `Кекс`];

// Рандомный аватар

function randomAvatars(avatars) {
  return avatars[getRandomInt(0, avatars.length - 1)];
}

const avatars = [`img/avatar-1.svg`, `img/avatar-2.svg`, `img/avatar-3.svg`, `img/avatar-4.svg`, `img/avatar-5.svg`, `img/avatar-6.svg`];

// Функция рандомного числа для лайков

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// Функция создания комментария

const createCommentsArray = function (amount) {
  const resultComments = [];
  for (let i = 0; i <= amount; i++) {
    resultComments.push({
      avatar: randomAvatars(avatars),
      message: randomMessages(messages),
      name: randomNames(names),
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

let template = document.querySelector(`#pictures`).content;

// Создание фукнции на основ шаблона

let cardCreate = function () {
  let element = template.cloneNode(true);

  element.querySelector(`picture__likes`).textContent = getRandom(15, 200);
  element.querySelector(`picture__comments`).textContent = randomMessages(messages);
  element.querySelector(`img`).src = createDescription.url;
  return element;
};

let pictures = document.querySelector(`.pictures`);
let fragment = document.createDocumentFragment();
fragment.appendChild(cardCreate());
pictures.appendChild(fragment);
