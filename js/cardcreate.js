"use strict";

(function () {

  const AVATAR = {
    width: 35,
    height: 25,
  };

  const template = document.querySelector(`#picture`)
.content
.querySelector(`.picture`);

  const createCardElement = function (object) {
    const cardElement = template.cloneNode(true);

    cardElement.querySelector(`.picture__likes`).textContent = object.likes;
    cardElement.querySelector(`.picture__comments`).textContent = object.comments.length;
    cardElement.querySelector(`img`).src = object.url;
    return cardElement;
  };

  // 6.1

  const renderPictures = function (cardsArray) {
    const pictures = document.querySelector(`.pictures`);
    const fragment = document.createDocumentFragment();
    cardsArray.forEach(function (value) {
      fragment.appendChild(createCardElement(value));
    });
    pictures.appendChild(fragment);
    return fragment;
  };

  const createSocialComment = function (object) {
    const fragment = document.createDocumentFragment();
    const socialComments = document.querySelector(`.social__comments`);
    const socialComment = socialComments.querySelector(`li`);
    socialComments.innerHTML = ``;

    object.comments.forEach(function (value) {
      const li = socialComment.cloneNode(true);
      li.querySelector(`.social__picture`).src = value.avatar;
      li.querySelector(`.social__picture`).alt = value.name;
      li.querySelector(`.social__picture`).width = AVATAR.width;
      li.querySelector(`.social__picture`).height = AVATAR.height;
      li.querySelector(`.social__text`).textContent = value.message;
      fragment.append(li);
      socialComments.append(fragment);
    });
  };

  const errorHandler = function (errorMessage) {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  const successDataLoadHandler = function (data) {
    renderPictures(data);
    window.bigpicture.openBigPicture(data);
    window.bigpicture.bigPicture.classList.add(`hidden`);
    document.querySelector(`.img-filters`).classList.remove(`img-filters--inactive`);

    const smallPhotos = document.querySelectorAll(`.picture`);
    const addSmallPhotoClicker = function (smallphoto, content) {
      smallphoto.addEventListener(`click`, function (evt) {
        evt.preventDefault();
        document.addEventListener(`keydown`, window.bigpicture.bigPictureEscPress);
        window.bigpicture.openBigPicture(content);
        createSocialComment(content);
      });
    };
    for (let i = 0; i < smallPhotos.length; i++) {
      addSmallPhotoClicker(smallPhotos[i], data[i]);
    }
  };

  window.server.load(successDataLoadHandler, errorHandler);

})();


