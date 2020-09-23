"use strict";

//Напишите функцию для создания массива из 25 сгенерированных JS объектов. Каждый объект массива ‐ описание фотографии, опубликованной пользователем. Поля объекта:


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

// Массив аватар

const avatars = [
  {
    avatar: `img/avatar-1.svg`
  },
  {
    avatar: `img/avatar-2.svg`
  },
  {
    avatar: `img/avatar-3.svg`
  },
  {
    avatar: `img/avatar-4.svg`
  },
  {
    avatar: `img/avatar-5.svg`
  },
  {
    avatar: `img/avatar-6.svg`
  }
];

// Рандомный аватар

const randomAvatar = Math.floor(Math.random() * avatars.length);

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
    avatar: randomAvatar,
    message: randomMessage,
    name: randomName,
  }
];

const randomReview = Math.floor(Math.random() * reviews.length);

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
    comments: randomReview, // массив объектов — список комментариев, оставленных другими пользователями к этой фотографии. Количество комментариев к каждой фотографии вы определяете на своё усмотрение. Все комментарии генерируются случайным образом.
  },

  {
    url: `photos/2.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: randomReview,
  },

  {
    url: `photos/3.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: randomReview,
  },

  {
    url: `photos/4.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: randomReview,
  },

  {
    url: `photos/5.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: randomReview,
  },

  {
    url: `photos/6.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: randomReview,
  },

  {
    url: `photos/7.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: randomReview,
  },

  {
    url: `photos/8.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: randomReview,
  },

  {
    url: `photos/9.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: randomReview,
  },

  {
    url: `photos/10.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: randomReview,
  },

  {
    url: `photos/11.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: randomReview,
  },

  {
    url: `photos/12.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: randomReview,
  },

  {
    url: `photos/13.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: randomReview,
  },

  {
    url: `photos/14.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: randomReview,
  },

  {
    url: `photos/15.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: randomReview,
  },

  {
    url: `photos/16.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: randomReview,
  },

  {
    url: `photos/17.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: randomReview,
  },

  {
    url: `photos/18.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: randomReview,
  },

  {
    url: `photos/19.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: randomReview,
  },

  {
    url: `photos/20.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: randomReview,
  },

  {
    url: `photos/21.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: randomReview,
  },

  {
    url: `photos/22.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: randomReview,
  },

  {
    url: `photos/23.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: randomReview,
  },

  {
    url: `photos/24.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: randomReview,
  },

  {
    url: `photos/25.jpg`,
    description: `Фото`,
    likes: getRandom(15, 200),
    comments: randomReview,
  },
];

const creationDescription = function () {
  let photoDescription = [];
  for (let photo of photos) {
    photoDescription.push(photo);
  }
};


