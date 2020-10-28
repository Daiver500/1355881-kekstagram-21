"use strict";

(function () {

  const filterDefault = document.querySelector(`#filter-default`);
  const filterRandom = document.querySelector(`#filter-random`);
  const filterDiscussed = document.querySelector(`#filter-discussed`);


  // Функция рандомного вызова массива (сообщения, имена)

  const getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getRandomArrayElement = function (array) {
    return array[getRandomInt(0, array.length - 1)];
  };

  filterDefault.addEventListener(`click`, function () {
    photosFromServer();
  });

  const photosFromServer = function () {
    const defaultPhotos = window.cardcreate.cardsSet;
    console.log(defaultPhotos);
  };


  filterRandom.addEventListener(`click`, function () {
    tenRandomPhotos();
  });

  const objectsAmount = 10;
  // const shuffle = window.cardcreate.cardsSet.sort(function (){
  // return Math.random() - 0.5;
  // });

  const tenRandomPhotos = function () {
    const newArray = [];
    for (let i = 1; i <= objectsAmount; i++) {

      newArray.push(
          getRandomArrayElement(window.cardcreate.cardsSet)
      );

    }
    console.log(newArray);
    return newArray;
  };

  filterDiscussed.addEventListener(`click`, function () {
    photosByComments();
  });


  const photosByComments = function () {
    const newArray2 = [];
    for (let i = 0; i < window.cardcreate.cardsSet.length; i++) {
      newArray2.push(
          window.cardcreate.cardsSet[i]);
    }
    newArray2.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    console.log(newArray2);

  };


})();
