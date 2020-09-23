"use strict";

const names = [`Артем`, `Петя`, `Вася`, `Даша`, `Иван`, `Алексей`];
const messages = [`В целом всё неплохо. Но не всё.`, `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`];
const avatars = [`img/avatar-1.svg`, `img/avatar-2.svg`, `img/avatar-3.svg`, `img/avatar-4.svg`, `img/avatar-5.svg`, `img/avatar-6.svg`];
const photos = [`photos/1.jpg`, `photos/2.jpg`, `photos/3.jpg`, `photos/4.jpg`, `photos/5.jpg`, `photos/6.jpg`, `photos/7.jpg`, `photos/8.jpg`, `photos/9.jpg`, `photos/10.jpg`,
  `photos/11.jpg`, `photos/12.jpg`, `photos/13.jpg`, `photos/14.jpg`, `photos/15.jpg`, `photos/16.jpg`, `photos/17.jpg`, `photos/18.jpg`, `photos/19.jpg`,
  `photos/20.jpg`, `photos/21.jpg`, `photos/22.jpg`, `photos/23.jpg`, `photos/24.jpg`, `photos/25.jpg`];


const reviews = [
  {
    avatar: avatars,
    message: messages,
    name: names
  }
];

const getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const photosDescription = [
  {
    url: photos,
    description: `Фото`,
    likes: getRandomNumber(15, 200),
    comments: reviews
  }
];


