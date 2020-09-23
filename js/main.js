"use strict";

//Напишите функцию для создания массива из 25 сгенерированных JS объектов. Каждый объект массива ‐ описание фотографии, опубликованной пользователем. Поля объекта:

const creationDescription = function () {
  let photoDescription = [];
  for (let photo of photos) {
    photoDescription.push(photo);
  }
};

const randomReview = Math.floor(Math.random() * reviews.length);

const creationReviews = function () {
  let replies = [];
  replies.push(randomReview);
};

// Случайное число от 15 до 200 (для лайков)

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// 25 сгенерированных JS объектов (массив)
const photos = [
  {
    url: `photos/1.jpg`, // строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} это число от 1 до 25. Адреса картинок не должны повторяться.
    description: `Фото`, // строка — описание фотографии.
    likes: getRandom(15, 200), // число — количество лайков, поставленных фотографии. Случайное число от 15 до 200
    comments: creationReviews, // массив объектов — список комментариев, оставленных другими пользователями к этой фотографии. Количество комментариев к каждой фотографии вы определяете на своё усмотрение. Все комментарии генерируются случайным образом.
  },

  {
    url: `photos/2.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: creationReviews,
  },

  {
    url: `photos/3.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: creationReviews,
  },

  {
    url: `photos/4.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: creationReviews,
  },

  {
    url: `photos/5.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: creationReviews,
  },

  {
    url: `photos/6.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: creationReviews,
  },

  {
    url: `photos/7.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: creationReviews,
  },

  {
    url: `photos/8.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: creationReviews,
  },

  {
    url: `photos/9.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: creationReviews,
  },

  {
    url: `photos/10.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: creationReviews,
  },

  {
    url: `photos/11.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: creationReviews,
  },

  {
    url: `photos/12.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: creationReviews,
  },

  {
    url: `photos/13.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: creationReviews,
  },

  {
    url: `photos/14.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: creationReviews,
  },

  {
    url: `photos/15.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: creationReviews,
  },

  {
    url: `photos/16.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: creationReviews,
  },

  {
    url: `photos/17.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: creationReviews,
  },

  {
    url: `photos/18.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: creationReviews,
  },

  {
    url: `photos/19.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: creationReviews,
  },

  {
    url: `photos/20.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: creationReviews,
  },

  {
    url: `photos/21.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: creationReviews,
  },

  {
    url: `photos/22.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: creationReviews,
  },

  {
    url: `photos/23.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: creationReviews,
  },

  {
    url: `photos/24.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: creationReviews,
  },

  {
    url: `photos/25.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: creationReviews,
  },
];

// Массив сообщений

const messages = [
  {
    message: `В целом всё неплохо. Но не всё.`
  },
  {
    message: `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`
  }
];

// Рандомное сообщение

const randomMessage = Math.floor(Math.random() * messages.length);

const creationMessages = function () {
  reviews.name = randomMessage;
};

// Массив имен

const names = [
  {
    name: `Артем`
  },
  {
    name: `Петя`
  },
  {
    name: `Вася`
  },
  {
    name: `Даша`
  },
  {
    name: `Иван`
  },
  {
    name: `Алексей`
  }
];

// Рандомное имя

const randomName = Math.floor(Math.random() * names.length);

const creationNames = function () {
  reviews.name = randomName;
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
    message: creationMessages,
    name: creationNames,
  }
];


