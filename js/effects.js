"use strict";

// Интенсивность эффекта и ползунок

(function () {

  // Эффект на изображение

  const img = document.querySelector(`.img-upload__preview img`);
  const effects = document.querySelector(`.effects`);

  const filterChange = function (evt) {
    if (evt.target.matches(`input[type="radio"]`)) {
      img.className = ``;
      setDefaultDepth();
      img.className = `effects__preview--${evt.target.value}`;
    }
  };

  effects.addEventListener(`click`, filterChange);

  // Интенсивность эффекта и ползунок

  const DEFAULT_EFFECT_LEVEL = 100;

  const MaxEffectsValues = {
    chrome: 1,
    sepia: 1,
    marvin: 100,
    phobos: 3,
    heat: [1, 2],
  };

  const effectLevel = document.querySelector(`.effect-level`);
  const effectLevelPin = effectLevel.querySelector(`.effect-level__pin`);
  const effectLevelLine = effectLevel.querySelector(`.effect-level__line`);
  const effectLevelDepth = effectLevel.querySelector(`.effect-level__depth`);
  const effectLevelValue = effectLevel.querySelector(`.effect-level__value`);

  const setDefaultDepth = function () {
    effectLevelPin.style.left = DEFAULT_EFFECT_LEVEL + `%`;
    effectLevelDepth.style.width = DEFAULT_EFFECT_LEVEL + `%`;
    effectLevelValue.value = DEFAULT_EFFECT_LEVEL;
    window.scale.imageUploadPreview.style.filter = ``;
  };

  (function () {
    window.effects = {
      setDefaultDepth
    };
  })();

  const setNewEffectDepth = function (levelValue) {
    const value = levelValue / 100;

    if (window.scale.imageUploadPreview.className.match(`effects__preview--`)) {
      switch (window.scale.imageUploadPreview.className) {
        case `effects__preview--chrome`:
          window.scale.imageUploadPreview.style.filter = `grayscale(${MaxEffectsValues.chrome * value})`;
          break;
        case `effects__preview--sepia`:
          window.scale.imageUploadPreview.style.filter = `sepia(${MaxEffectsValues.sepia * value})`;
          break;
        case `effects__preview--marvin`:
          window.scale.imageUploadPreview.style.filter = `invert(${levelValue}%)`;
          break;
        case `effects__preview--phobos`:
          window.scale.imageUploadPreview.style.filter = `blur(${MaxEffectsValues.phobos * value}px)`;
          break;
        case `effects__preview--heat`:
          window.scale.imageUploadPreview.style.filter = `brightness(${MaxEffectsValues.heat[1] * value + MaxEffectsValues.heat[0]})`;
          break;
        default:
          window.scale.imageUploadPreview.style.filter = ``;
      }
    }
  };
  const onEffectsLevelPinMouseDown = function (evt) {
    evt.preventDefault();

    const lineWidth = effectLevelLine.offsetWidth;
    let startCoordinates = evt.clientX;

    const oneEffectLevelPinMove = function (moveEvt) {
      moveEvt.preventDefault();

      const shift = startCoordinates - moveEvt.clientX;
      const pinX = effectLevelPin.offsetLeft - shift;

      startCoordinates = moveEvt.clientX;

      if (!(pinX < 0 || pinX > lineWidth)) {
        const pinPoint = pinX / lineWidth;
        effectLevelPin.style.left = pinX + `px`;
        effectLevelValue.value = Math.round(pinPoint * 100);
        effectLevelDepth.style.width = Math.round(pinPoint * 100) + `%`;
        setNewEffectDepth(effectLevelValue.value);
      }
    };
    const oneffectLevelPinMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, oneEffectLevelPinMove);
      document.removeEventListener(`mouseup`, oneffectLevelPinMouseUp);

    };

    document.addEventListener(`mousemove`, oneEffectLevelPinMove);
    document.addEventListener(`mouseup`, oneffectLevelPinMouseUp);
  };

  effectLevelPin.addEventListener(`mousedown`, onEffectsLevelPinMouseDown);

  const liFirst = document.querySelector(`.effects__item:first-child`);
  const Li = document.querySelectorAll(`.effects__item`);
  const imgUploadEffectLevel = document.querySelector(`.img-upload__effect-level`);

  imgUploadEffectLevel.classList.add(`hidden`);

  Li.forEach(function (item) {
    item.addEventListener(`click`, function () {
      imgUploadEffectLevel.classList.remove(`hidden`);
    });
  });

  liFirst.addEventListener(`click`, function () {
    imgUploadEffectLevel.classList.add(`hidden`);
  });
})();
