'use strict';

(function () {

  const FILE_TYPES = [`JPG`, `JPEG`, `PNG`];

  const fileChooser = document.querySelector(`.img-upload__start input[type=file]`);
  const preview = document.querySelector(`.img-upload__preview img`);
  console.log(preview);

  fileChooser.addEventListener(`change`, function () {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();
    console.log(file);

    const matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();
      reader.addEventListener(`load`, function () {
        preview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }

  });

})();
