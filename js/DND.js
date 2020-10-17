"use strict";

// Интенсивность эффекта и ползунок

(function () {

  const DEFAULT_EFFECT_LEVEL = 100;

  const MaxEffectsValues = {
    chrome: 1,
    sepia: 1,
    marvin: 100,
    phobos: 3,
    heat: [1, 3],
  };

  const effectLevel = document.querySelector(`.effect-level`);
  const effectLevelPin = effectLevel.querySelector(`.effect-level__pin`);
  const effectLevelLine = effectLevel.querySelector(`.effect-level__line`);
  const effectLevelDepth = effectLevel.querySelector(`.effect-level__depth`);
  const effectLevelValue = effectLevel.querySelector(`.effect-level__value`);
  const imageUploadPreview = document.querySelector(`.img-upload__preview`);

  const setDefaultDepth = function () {
    effectLevelPin.style.left = DEFAULT_EFFECT_LEVEL + `%`;
    effectLevelDepth.style.width = DEFAULT_EFFECT_LEVEL + `%`;
    effectLevelValue.value = DEFAULT_EFFECT_LEVEL;
  };


  const setNewEffectDepth = function (levelValue) {
    console.log(`func`)
    const value = levelValue / 100;

    if (imageUploadPreview.className.match(`effects__preview--`)) {
      switch (imageUploadPreview.className) {
        case `effects__preview--chrome`:
          imageUploadPreview.style.filter = `grayscale(${MaxEffectsValues.chrome * value})`;
          break;
        case `effects__preview--sepia`:
          imageUploadPreview.style.filter = `sepia(${MaxEffectsValues.sepia * value})`;
          break;
        case `effects__preview--marvin`:
          imageUploadPreview.style.filter = `invert(${levelValue}%)`;
          break;
        case `effects__preview--phobos`:
          imageUploadPreview.style.filter = `blur(${MaxEffectsValues.phobos * value}px)`;
          break;
        case `effects__preview--heat`:
          imageUploadPreview.style.filter = `brightness()`;
          break;
        default:
          imageUploadPreview.style.filter = ``;
      }
    }
  };
  const onEffectsLevelPinMouseDown = function (evt) {
    evt.preventDefault();

    const lineWidth = effectLevelLine.offsetWidth;
    let startCoordinates = evt.clientX;
    console.log(startCoordinates);

    const oneEffectLevelPinMove = function (moveEvt) {
      moveEvt.preventDefault();

      const shift = startCoordinates - moveEvt.clientX;
      const pinX = effectLevelPin.offsetLeft - shift;

      startCoordinates = moveEvt.clientX;

      if (!(pinX < 0 || pinX > lineWidth)) {
        console.log(`in if`);
        const pinPoint = pinX / lineWidth;
        effectLevelPin.style.left = pinX + `px`;
        // effectLevelValue.value = Math.round(pinPoint * 100);
        console.log(effectLevelValue.value);
        effectLevelDepth.style.width = Math.round(pinPoint * 100) + `%`;
        setNewEffectDepth(Math.round(pinPoint * 100));
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

})();
