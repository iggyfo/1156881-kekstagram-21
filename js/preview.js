'use strict';
const START_PIN_POSITION = 100;
const ESC = `Escape`;
const uploadOverlay = window.form.node.querySelector(`.img-upload__overlay`);
const scaleControlSmaller = window.form.node.querySelector(`.scale__control--smaller`);
const scaleControlBigger = window.form.node.querySelector(`.scale__control--bigger`);
const scaleControlValue = window.form.node.querySelector(`.scale__control--value`);
const imgPreview = window.form.node.querySelector(`.img-upload__preview`);
const slider = window.form.node.querySelector(`.img-upload__effect-level`);

const showModal = () => {
  document.body.classList.add(`modal-open`);
  uploadOverlay.classList.remove(`hidden`);
  slider.classList.add(`hidden`);
  document.addEventListener(`keydown`, closeModal);
};

const closeModal = (evt) => {
  if (evt.key === ESC || evt.type === `click` || evt.type === `submit`) {
    document.body.classList.remove(`modal-open`);
    uploadOverlay.classList.add(`hidden`);
    imgPreview.className = `img-upload__preview`;
    imgPreview.style.removeProperty(`filter`);
    imgPreview.style.transform = `scale(1)`;
    currentScaleValue = 100;
  }
  document.removeEventListener(`keydown`, closeModal);
};

const setCurrentScaleValue = (value) => {
  scaleControlValue.value = value + `%`;
  imgPreview.style.transform = `scale(` + (value / 100) + `)`;
};

let currentScaleValue = parseInt(scaleControlValue.value, 10);
imgPreview.style.transform = `scale(` + currentScaleValue / 100 + `)`;

scaleControlSmaller.addEventListener(`click`, () => {
  if (currentScaleValue !== 25) {
    currentScaleValue -= 25;
    setCurrentScaleValue(currentScaleValue);
  }
});

scaleControlBigger.addEventListener(`click`, () => {
  if (currentScaleValue !== 100) {
    currentScaleValue += 25;
    setCurrentScaleValue(currentScaleValue);
  }
});

const effectsRadio = document.querySelectorAll(`.effects__radio`);
effectsRadio.forEach((element) => {
  element.addEventListener(`change`, () => {
    imgPreview.className = `img-upload__preview`;
    imgPreview.style.removeProperty(`filter`);
    slider.classList.remove(`hidden`);

    switch (element.id) {
      case `effect-none`:
        slider.classList.add(`hidden`);
        imgPreview.className = `img-upload__preview`;
        break;
      case `effect-chrome`:
        imgPreview.classList.add(`effects__preview--chrome`);
        window.slider.getPinPosition(START_PIN_POSITION);
        break;
      case `effect-sepia`:
        imgPreview.classList.add(`effects__preview--sepia`);
        window.slider.getPinPosition(START_PIN_POSITION);
        break;
      case `effect-marvin`:
        imgPreview.classList.add(`effects__preview--marvin`);
        window.slider.getPinPosition(START_PIN_POSITION);
        break;
      case `effect-phobos`:
        imgPreview.classList.add(`effects__preview--phobos`);
        window.slider.getPinPosition(START_PIN_POSITION);
        break;
      case `effect-heat`:
        imgPreview.classList.add(`effects__preview--heat`);
        window.slider.getPinPosition(START_PIN_POSITION);
        break;
    }
  });
});

window.preview = {
  showModal,
  closeModal
};
