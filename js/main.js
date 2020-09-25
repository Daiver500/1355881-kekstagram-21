"use strict";

// Массив сообщений

const messages = [`Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`];

// Массив имен

const names = [`Артем`, `Петя`, `Вася`, `Даша`, `Иван`, `Алексей`];

// Массив аватар

const avatars = [`img/avatar-1.svg`, `img/avatar-2.svg`, `img/avatar-3.svg`, `img/avatar-4.svg`, `img/avatar-5.svg`, `img/avatar-6.svg`
];


// Функция случайного числа от 15 до 200 (для лайков)

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

getRandom(15, 200);

// Функция создания массива из 25 объектов
const createDescription = function (objects) {
  let photoDescription = [];
  for (let i = 0; i < objects; i++) {
    photoDescription.push{
      url:``,
      description: ``,
      likes: getRandom(15, 200),
      comments: {}
    };
  }
  return photoDescription;
};

createDescription(25);

