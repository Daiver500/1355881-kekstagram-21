"use strict";

(function () {

  const VALUE = {
    min: 25,
    max: 100
  };

  const scaleControlSmaller = document.querySelector(`.scale__control--smaller`);
  const scaleControlBigger = document.querySelector(`.scale__control--bigger`);
  const scaleValue = document.querySelector(`.scale__control--value`);
  const imageUploadPreview = document.querySelector(`.img-upload__preview img`);

  const onMinusScaleClick = function () {
    let scale = parseInt(scaleValue.value, 10);
    if (scale <= VALUE.max && scale > VALUE.min) {
      scale -= VALUE.min;
    }
    imageStyleChange(scale);
  };

  scaleControlSmaller.addEventListener(`click`, onMinusScaleClick);

  const onPlusScaleClick = function () {
    let scale = parseInt(scaleValue.value, 10);
    if (scale >= VALUE.min && scale < VALUE.max) {
      scale += VALUE.min;
    }
    imageStyleChange(scale);
  };

  scaleControlBigger.addEventListener(`click`, onPlusScaleClick);

  const imageStyleChange = function (number) {
    switch (number) {
      case 25:
        imageUploadPreview.style.transform = `scale(0.25)`;
        scaleValue.value = `${number}%`;
        break;
      case 50:
        imageUploadPreview.style.transform = `scale(0.50)`;
        scaleValue.value = `${number}%`;
        break;
      case 75:
        imageUploadPreview.style.transform = `scale(0.75)`;
        scaleValue.value = `${number}%`;
        break;
      case 100:
        imageUploadPreview.style.transform = `scale(1.00)`;
        scaleValue.value = `${number}%`;
        break;
    }
  };

  window.scale = {
    imageUploadPreview
  };
})();
