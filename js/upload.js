'use strict';
(function () {
  let URL = ` https://21.javascript.pages.academy/kekstagram`;

  const StatusCode = {
    OK: 200
  };

  window.upload = function (data, onSuccess, onError) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });

    xhr.open(`POST`, URL);
    xhr.send(data);
  };
})();
