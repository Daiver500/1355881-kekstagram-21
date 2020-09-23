"use strict";

// Функция

const creation = function () {};

// Массивы

const names = [`Артем`, `Петя`, `Вася`, `Даша`, `Иван`, `Алексей`];
const messages = [`В целом всё неплохо. Но не всё.`, `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`];
const avatars = [`img/avatar-1.svg`, `img/avatar-2.svg`, `img/avatar-3.svg`, `img/avatar-4.svg`, `img/avatar-5.svg`, `img/avatar-6.svg`];
const photos = [`photos/1.jpg`, `photos/2.jpg`, `photos/3.jpg`, `photos/4.jpg`, `photos/5.jpg`, `photos/6.jpg`, `photos/7.jpg`, `photos/8.jpg`, `photos/9.jpg`, `photos/10.jpg`,
  `photos/11.jpg`, `photos/12.jpg`, `photos/13.jpg`, `photos/14.jpg`, `photos/15.jpg`, `photos/16.jpg`, `photos/17.jpg`, `photos/18.jpg`, `photos/19.jpg`,
  `photos/20.jpg`, `photos/21.jpg`, `photos/22.jpg`, `photos/23.jpg`, `photos/24.jpg`, `photos/25.jpg`];

// Случайное число от 15 до 200 (для лайков)

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
getRandom(15, 200);

//Напишите функцию для создания массива из 25 сгенерированных JS объектов. Каждый объект массива ‐ описание фотографии, опубликованной пользователем. Поля объекта:

// Массив объектов
const photoDescription = [
  {
    url: `photos/1.jpg`, // строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} это число от 1 до 25. Адреса картинок не должны повторяться.

    description: `Фото`, // строка — описание фотографии.

    likes: getRandom(15, 200), // число — количество лайков, поставленных фотографии. Случайное число от 15 до 200

    comments: reviews, // массив объектов — список комментариев, оставленных другими пользователями к этой фотографии. Количество комментариев к каждой фотографии вы определяете на своё усмотрение. Все комментарии генерируются случайным образом.
  }
];

// Массив объектов

const reviews = [
  {
    avatar: `img/avatar-1.svg`,
    message: `В целом всё неплохо. Но не всё.`,
    name: `Артем`,
  },
  {
    avatar: `img/avatar-2.svg`,
    message: `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
    name: `Петя`,
  },
  {
    avatar: `img/avatar-3.svg`,
    message: `В целом всё неплохо. Но не всё.`,
    name: `Вася`,
  },
  {
    avatar: `img/avatar-4.svg`,
    message: `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
    name: `Даша`,
  },
  {
    avatar: `img/avatar-5.svg`,
    message: `В целом всё неплохо. Но не всё.`,
    name: `Иван`,
  },
  {
    avatar: `img/avatar-6.svg`,
    message: `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
    name: `Алексей`,
  }
];

// Для формирования текста комментария — message — вам необходимо взять одно или два случайных предложения из представленных ниже:
//В целом всё неплохо. Но не всё.
//Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.
