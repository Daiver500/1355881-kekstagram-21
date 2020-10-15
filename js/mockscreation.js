"use strict";

(function () {
// Константы

  const OBJECTS_AMOUNT = 25;
  const LIKES = {
    min: 15,
    max: 200,
  };
  const COMMENTS = {
    min: 1,
    max: 5,
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

  (function () {
    const mocks = createMocksArray(OBJECTS_AMOUNT);

    window.mockscreation = {
      mocks
    };
  })();
})();
