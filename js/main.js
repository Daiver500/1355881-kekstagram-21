"use strict";

//Напишите функцию для создания массива из 25 сгенерированных JS объектов. Каждый объект массива ‐ описание фотографии, опубликованной пользователем. Поля объекта:

const creationDescription = function () {
  let photoDescription = [];
  for (let photo of photos) {
    photoDescription.push(photo);
  }
};

// массив объектов — список комментариев

const creationReplies = function () {
  let replies = [];
  for (let review of reviews) {
    replies.push(review[0] || review[1] || review[2] || review[3] || review[4] || review[5] || review[6]);
  }
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
    comments: creationReplies, // массив объектов — список комментариев, оставленных другими пользователями к этой фотографии. Количество комментариев к каждой фотографии вы определяете на своё усмотрение. Все комментарии генерируются случайным образом.
  },

  {
    url: `photos/2.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: creationReplies,
  },

  {
    url: `photos/3.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: creationReplies,
  },

  {
    url: `photos/4.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: creationReplies,
  },

  {
    url: `photos/5.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: creationReplies,
  },

  {
    url: `photos/6.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: creationReplies,
  },

  {
    url: `photos/7.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: creationReplies,
  },

  {
    url: `photos/8.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: creationReplies,
  },

  {
    url: `photos/9.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: creationReplies,
  },

  {
    url: `photos/10.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: creationReplies,
  },

  {
    url: `photos/11.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: creationReplies,
  },

  {
    url: `photos/12.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: creationReplies,
  },

  {
    url: `photos/13.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: creationReplies,
  },

  {
    url: `photos/14.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: creationReplies,
  },

  {
    url: `photos/15.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: creationReplies,
  },

  {
    url: `photos/16.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: creationReplies,
  },

  {
    url: `photos/17.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: creationReplies,
  },

  {
    url: `photos/18.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: creationReplies,
  },

  {
    url: `photos/19.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: creationReplies,
  },

  {
    url: `photos/20.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: creationReplies,
  },

  {
    url: `photos/21.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: creationReplies,
  },

  {
    url: `photos/22.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: creationReplies,
  },

  {
    url: `photos/23.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: creationReplies,
  },

  {
    url: `photos/24.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: creationReplies,
  },

  {
    url: `photos/25.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: creationReplies,
  },
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

// Массив сообщений

const messages = [
  {
    message: `В целом всё неплохо. Но не всё.`
  },
  {
    message: `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`
  }
];


