"use strict";

const REFERENCE = {
  load: `https://javascript.pages.academy/kekstagram/data`,
  upload: `https://javascript.pages.academy/kekstagram`
};

const TIMEOUT_IN_MS = 10000;

const StatusCode = {
  OK: 200
};

const getServerRequest = (xhr, onSuccess, onError) => {
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    if (xhr.status === StatusCode.OK) {
      onSuccess(xhr.response);
    } else {
      onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
    }
  });
  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
  });

  xhr.timeout = TIMEOUT_IN_MS;
};

const load = (success, error) => {
  const xhr = new XMLHttpRequest();
  xhr.open(`GET`, REFERENCE.load);
  getServerRequest(xhr, success, error);
  xhr.send();
};


const upload = (data, success, error) => {
  const xhr = new XMLHttpRequest();
  xhr.open(`POST`, REFERENCE.upload);
  getServerRequest(xhr, success, error);
  xhr.send(data);
};

window.server = {
  load,
  upload
};


