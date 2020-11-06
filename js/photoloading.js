'use strict';

(function () {

  const FILE_TYPES = [`JPG`, `JPEG`, `PNG`];

  const fileChooser = document.querySelector(`.img-upload__start input[type=file]`);
  const preview = document.querySelector(`.img-upload__preview img`);

  fileChooser.addEventListener(`change`, function () {
    const file = fileChooser.files[0];
    console.log(file)

  });

})();
