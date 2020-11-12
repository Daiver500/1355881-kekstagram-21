"use strict";

const Value = {
  MIN: 25,
  MAX: 100
};

const scaleControlSmaller = document.querySelector(`.scale__control--smaller`);
const scaleControlBigger = document.querySelector(`.scale__control--bigger`);
const counterValue = document.querySelector(`.scale__control--value`);
const imageUploadPreview = document.querySelector(`.img-upload__preview img`);

const clickOnMinusScaleHandler = () => {
  let scale = parseInt(counterValue.value, 10);
  if (scale <= Value.MAX && scale > Value.MIN) {
    scale -= Value.MIN;
  }
  changeImageStyle(scale);
};

scaleControlSmaller.addEventListener(`click`, clickOnMinusScaleHandler);

const clickOnPlusScaleHandler = () => {
  let scale = parseInt(counterValue.value, 10);
  if (scale >= Value.MIN && scale < Value.MAX) {
    scale += Value.MIN;
  }
  changeImageStyle(scale);
};

scaleControlBigger.addEventListener(`click`, clickOnPlusScaleHandler);

const changeImageStyle = (number) => {
  switch (number) {
    case 25:
      imageUploadPreview.style.transform = `scale(0.25)`;
      counterValue.value = `${number}%`;
      break;
    case 50:
      imageUploadPreview.style.transform = `scale(0.50)`;
      counterValue.value = `${number}%`;
      break;
    case 75:
      imageUploadPreview.style.transform = `scale(0.75)`;
      counterValue.value = `${number}%`;
      break;
    case 100:
      imageUploadPreview.style.transform = `scale(1.00)`;
      counterValue.value = `${number}%`;
      break;
  }
};

window.scale = {
  imageUploadPreview,
  counterValue
};

