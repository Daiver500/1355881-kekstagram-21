"use strict";

const DEFAULT_EFFECT_LEVEL = 100;
const MAX_EFFECTS_VALUES = {
  chrome: 1,
  sepia: 1,
  marvin: 100,
  phobos: 3,
  heat: [1, 2],
};

const effects = document.querySelector(`.effects`);
const effectLevel = document.querySelector(`.effect-level`);
const effectLevelPin = effectLevel.querySelector(`.effect-level__pin`);
const effectLevelLine = effectLevel.querySelector(`.effect-level__line`);
const effectLevelDepth = effectLevel.querySelector(`.effect-level__depth`);
const effectLevelValue = effectLevel.querySelector(`.effect-level__value`);
const effectsItemDefault = document.querySelector(`.effects__item:first-child`);
const effectsItem = document.querySelectorAll(`.effects__item`);
const imgUploadEffectLevel = document.querySelector(`.img-upload__effect-level`);

imgUploadEffectLevel.classList.add(`hidden`);

const changeFilterHandler = function (evt) {
  if (evt.target.matches(`input[type="radio"]`)) {
    window.scale.imageUploadPreview.className = ``;
    setDefaultDepth();
    window.scale.imageUploadPreview.className = `effects__preview--${evt.target.value}`;
    window.scale.imageUploadPreview.style.transform = `scale(1.00)`;
    window.scale.counterValue.value = `${100}%`;
  }
};

effects.addEventListener(`click`, changeFilterHandler);

const setDefaultDepth = function () {
  effectLevelPin.style.left = DEFAULT_EFFECT_LEVEL + `%`;
  effectLevelDepth.style.width = DEFAULT_EFFECT_LEVEL + `%`;
  effectLevelValue.value = DEFAULT_EFFECT_LEVEL;
  window.scale.imageUploadPreview.style.filter = ``;
};

const setNewEffectDepth = function (levelValue) {
  const value = levelValue / 100;

  if (window.scale.imageUploadPreview.className.match(`effects__preview--`)) {
    switch (window.scale.imageUploadPreview.className) {
      case `effects__preview--chrome`:
        window.scale.imageUploadPreview.style.filter = `grayscale(${MAX_EFFECTS_VALUES.chrome * value})`;
        break;
      case `effects__preview--sepia`:
        window.scale.imageUploadPreview.style.filter = `sepia(${MAX_EFFECTS_VALUES.sepia * value})`;
        break;
      case `effects__preview--marvin`:
        window.scale.imageUploadPreview.style.filter = `invert(${levelValue}%)`;
        break;
      case `effects__preview--phobos`:
        window.scale.imageUploadPreview.style.filter = `blur(${MAX_EFFECTS_VALUES.phobos * value}px)`;
        break;
      case `effects__preview--heat`:
        window.scale.imageUploadPreview.style.filter = `brightness(${MAX_EFFECTS_VALUES.heat[1] * value + MAX_EFFECTS_VALUES.heat[0]})`;
        break;
      default:
        window.scale.imageUploadPreview.style.filter = ``;
    }
  }
};

const effectsLevelPinMouseDownHandler = function (evt) {
  evt.preventDefault();

  const lineWidth = effectLevelLine.offsetWidth;
  let startCoordinates = evt.clientX;

  const oneEffectLevelPinMoveHandler = function (moveEvt) {
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

  const oneEffectLevelPinMouseUpHandler = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener(`mousemove`, oneEffectLevelPinMoveHandler);
    document.removeEventListener(`mouseup`, oneEffectLevelPinMouseUpHandler);

  };

  document.addEventListener(`mousemove`, oneEffectLevelPinMoveHandler);
  document.addEventListener(`mouseup`, oneEffectLevelPinMouseUpHandler);
};

effectLevelPin.addEventListener(`mousedown`, effectsLevelPinMouseDownHandler);

effectsItem.forEach(function (item) {
  item.addEventListener(`click`, function () {
    imgUploadEffectLevel.classList.remove(`hidden`);
  });
});

effectsItemDefault.addEventListener(`click`, function () {
  imgUploadEffectLevel.classList.add(`hidden`);
});

window.effects = {
  setDefaultDepth,
  effectLevel
};


