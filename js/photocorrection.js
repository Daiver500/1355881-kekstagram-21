"use strict";

(function () {

  const VALUE = {
    min: 25,
    max: 100
  };

  // Масштаб:

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

  // Эффект на изображение

  const img = document.querySelector(`.img-upload__preview img`);
  const effects = document.querySelector(`.effects`);

  const filterChange = function (evt) {
    if (evt.target.matches(`input[type="radio"]`)) {
      img.className = ``;
      img.className = `effects__preview--${evt.target.value}`;
    }
  };

  effects.addEventListener(`click`, filterChange);


  // Интенсивность эффекта !!! НЕ ГОТОВО (DRAG AND DROP)

  const effectLevelPin = document.querySelector(`.effect-level__pin`);
  effectLevelPin.addEventListener(`mouseup`, function () {
  });
  const effectLevelValue = document.querySelector(`.effect-level__value`);

  effectLevelValue.value = {
    min: 0,
    max: 100
  };

  effectLevelValue.value; // меняется по перемещению effectLevelPin;
  img.style.filter; // меняется по изменению effectLevelValue.value ;

  // В зависимости от примененного класса применяется фильтр

  effectLevelValue.addEventListener(`change`, function () {
    if (img.className === `effects__preview--chrome`) {
      img.style.filter = `filter: grayscale(0..1)`;
    }
    if (img.className === `effects__preview--sepia`) {
      img.style.filter = `filter: sepia(0..1)`;
    }
    if (img.className === `effects__preview--marvin`) {
      img.style.filter = `filter: invert(0..100%)`;
    }
    if (img.className === `effects__preview--phobos`) {
      img.style.filter = `filter: blur(0..3px)`;
    }
    if (img.className === `effects__preview--heat`) {
      img.style.filter = `filter: brightness(1..3)`;
    }
  });

  const liFirst = document.querySelector(`.effects__item:first-child`);
  const Li = document.querySelector(`.effects__item:not(:first-child)`);
  const imgUploadEffectLevel = document.querySelector(`.img-upload__effect-level`);

  imgUploadEffectLevel.classList.add(`hidden`);

  liFirst.addEventListener(`click`, function () {
    imgUploadEffectLevel.classList.add(`hidden`);
  });

  Li.addEventListener(`click`, function () {
    imgUploadEffectLevel.classList.remove(`hidden`);
  });
})();
