"use strict";


const VALUE = {
  min: 25,
  max: 100
};

const scaleControlSmaller = document.querySelector(`.scale__control--smaller`);
const scaleControlBigger = document.querySelector(`.scale__control--bigger`);
const scaleValue = document.querySelector(`.scale__control--value`);
const imageUploadPreview = document.querySelector(`.img-upload__preview img`);

const clickOnMinusScale = function () {
  let scale = parseInt(scaleValue.value, 10);
  if (scale <= VALUE.max && scale > VALUE.min) {
    scale -= VALUE.min;
  }
  changeImageStyle(scale);
};

scaleControlSmaller.addEventListener(`click`, clickOnMinusScale);

const clickOnPlusScale = function () {
  let scale = parseInt(scaleValue.value, 10);
  if (scale >= VALUE.min && scale < VALUE.max) {
    scale += VALUE.min;
  }
  changeImageStyle(scale);
};

scaleControlBigger.addEventListener(`click`, clickOnPlusScale);

const changeImageStyle = function (number) {
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
  imageUploadPreview,
  scaleValue
};

