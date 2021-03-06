'use strict';
const effectPin = window.form.photoUpload.querySelector(`.effect-level__pin`);
const effectLevelDepth = window.form.photoUpload.querySelector(`.effect-level__depth`);
const effectLevelValue = window.form.photoUpload.querySelector(`.effect-level__value`);
const sliderWidth = window.form.photoUpload.querySelector(`.effect-level__line`);

const getPinPosition = (value) => {
  effectPin.style.left = `${value}%`;
  effectLevelDepth.style.width = `${value}%`;
  effectLevelValue.value = Math.round(value);
};

const initSlider = () => {
  effectPin.addEventListener(`mousedown`, (downEvt) => {
    downEvt.preventDefault();
    let startCoords = downEvt.clientX;
    const moveSlider = (moveEvt) => {
      moveEvt.preventDefault();
      let shift = startCoords - moveEvt.clientX;
      startCoords = moveEvt.clientX;
      let pinValue = (effectPin.offsetLeft - shift) / (sliderWidth.offsetWidth / 100);
      if (pinValue >= 100) {
        pinValue = 100;
      } else if (pinValue <= 0) {
        pinValue = 0;
      }
      getPinPosition(pinValue);

      const effectsRadio = document.querySelectorAll(`.effects__radio`);

      effectsRadio.forEach((element) => {
        if (element.checked) {
          switch (element.id) {
            case `effect-none`:
              window.form.imgPreview.style.filter = `none`;
              break;
            case `effect-chrome`:
              window.form.imgPreview.style.filter = `grayscale(` + effectLevelValue.value / 100 + `)`;
              break;
            case `effect-sepia`:
              window.form.imgPreview.style.filter = `sepia(` + effectLevelValue.value / 100 + `)`;
              break;
            case `effect-marvin`:
              window.form.imgPreview.style.filter = `invert(` + effectLevelValue.value + `%)`;
              break;
            case `effect-phobos`:
              window.form.imgPreview.style.filter = `blur(` + window.utils.getEffectValue(effectLevelValue.value) + `px)`;
              break;
            case `effect-heat`:
              window.form.imgPreview.style.filter = `brightness(` + window.utils.getEffectValue(effectLevelValue.value) + `)`;
              break;
          }
        }
      });
    };

    const closeSlider = (upEvt) => {
      upEvt.preventDefault();
      document.removeEventListener(`mousemove`, moveSlider);
      document.removeEventListener(`mouseup`, closeSlider);
    };
    document.addEventListener(`mousemove`, moveSlider);
    document.addEventListener(`mouseup`, closeSlider);
  });
};

window.slider = {
  initSlider,
  getPinPosition
};
