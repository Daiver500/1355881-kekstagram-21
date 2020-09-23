"use strict";

//Напишите функцию для создания массива из 25 сгенерированных JS объектов. Каждый объект массива ‐ описание фотографии, опубликованной пользователем. Поля объекта:

const creation = function () {
  let photoDescription = [];
  photoDescription.push(photo1);
  photoDescription.push(photo2);
  return photoDescription;
};

// Случайное число от 15 до 200 (для лайков)

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
getRandom(15, 200);

// массив объектов — список комментариев
let comments = [];
for (let elem of reviews) {
  comments.push(elem);
}

// 25 сгенерированных JS объектов
const photo1 = {
  url: `photos/1.jpg`, // строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} это число от 1 до 25. Адреса картинок не должны повторяться.
  description: `Фото`, // строка — описание фотографии.
  likes: getRandom(15, 200), // число — количество лайков, поставленных фотографии. Случайное число от 15 до 200
  comments: reviews, // массив объектов — список комментариев, оставленных другими пользователями к этой фотографии. Количество комментариев к каждой фотографии вы определяете на своё усмотрение. Все комментарии генерируются случайным образом.
};

const photo2 = {
  url: `photos/2.jpg`,
  description: `Фото`,
  likes: getRandom(15, 200),
  comments: reviews
};

const photo3 = {
  url: `photos/3.jpg`,
  description: `Фото`,
  likes: getRandom(15, 200),
  comments: reviews
};

const photo4 = {
  url: `photos/4.jpg`,
  description: `Фото`,
  likes: getRandom(15, 200),
  comments: reviews
};

const photo5 = {
  url: `photos/5.jpg`,
  description: `Фото`,
  likes: getRandom(15, 200),
  comments: reviews
};

const photo6 = {
  url: `photos/6.jpg`,
  description: `Фото`,
  likes: getRandom(15, 200),
  comments: reviews
};

const photo7 = {
  url: `photos/7.jpg`,
  description: `Фото`,
  likes: getRandom(15, 200),
  comments: reviews
};

const photo8 = {
  url: `photos/8.jpg`,
  description: `Фото`,
  likes: getRandom(15, 200),
  comments: reviews
};

const photo9 = {
  url: `photos/9.jpg`,
  description: `Фото`,
  likes: getRandom(15, 200),
  comments: reviews
};

const photo10 = {
  url: `photos/10.jpg`,
  description: `Фото`,
  likes: getRandom(15, 200),
  comments: reviews
};

const photo11 = {
  url: `photos/11.jpg`,
  description: `Фото`,
  likes: getRandom(15, 200),
  comments: reviews
};

const photo12 = {
  url: `photos/12.jpg`,
  description: `Фото`,
  likes: getRandom(15, 200),
  comments: reviews
};

const photo13 = {
  url: `photos/13.jpg`,
  description: `Фото`,
  likes: getRandom(15, 200),
  comments: reviews
};

const photo14 = {
  url: `photos/14.jpg`,
  description: `Фото`,
  likes: getRandom(15, 200),
  comments: reviews
};

const photo15 = {
  url: `photos/15.jpg`,
  description: `Фото`,
  likes: getRandom(15, 200),
  comments: reviews
};

const photo16 = {
  url: `photos/16.jpg`,
  description: `Фото`,
  likes: getRandom(15, 200),
  comments: reviews
};

const photo17 = {
  url: `photos/17.jpg`,
  description: `Фото`,
  likes: getRandom(15, 200),
  comments: reviews
};

const photo18 = {
  url: `photos/18.jpg`,
  description: `Фото`,
  likes: getRandom(15, 200),
  comments: reviews
};

const photo19 = {
  url: `photos/19.jpg`,
  description: `Фото`,
  likes: getRandom(15, 200),
  comments: reviews
};

const photo20 = {
  url: `photos/20.jpg`,
  description: `Фото`,
  likes: getRandom(15, 200),
  comments: reviews
};

const photo21 = {
  url: `photos/21.jpg`,
  description: `Фото`,
  likes: getRandom(15, 200),
  comments: reviews
};

const photo22 = {
  url: `photos/22.jpg`,
  description: `Фото`,
  likes: getRandom(15, 200),
  comments: reviews
};

const photo23 = {
  url: `photos/23.jpg`,
  description: `Фото`,
  likes: getRandom(15, 200),
  comments: reviews
};

const photo24 = {
  url: `photos/24.jpg`,
  description: `Фото`,
  likes: getRandom(15, 200),
  comments: reviews
};

const photo25 = {
  url: `photos/25.jpg`,
  description: `Фото`,
  likes: getRandom(15, 200),
  comments: reviews
};

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
