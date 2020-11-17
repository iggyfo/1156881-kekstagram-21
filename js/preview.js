'use strict';
const START_PIN_POSITION = 100;
const INIT_SCALE_VALUE = 100;
const STEP_SCALE_VALUE = 25;
const ESC = `Escape`;
const uploadOverlay = window.form.photoUpload.querySelector(`.img-upload__overlay`);
const photoUploadCancel = window.form.photoUpload.querySelector(`#upload-cancel`);
const scaleControlSmaller = window.form.photoUpload.querySelector(`.scale__control--smaller`);
const scaleControlBigger = window.form.photoUpload.querySelector(`.scale__control--bigger`);
const scaleControlValue = window.form.photoUpload.querySelector(`.scale__control--value`);
const slider = window.form.photoUpload.querySelector(`.img-upload__effect-level`);

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
    window.form.imgPreview.className = `img-upload__preview`;
    window.form.imgPreview.style.removeProperty(`filter`);
    window.form.imgPreview.style.transform = `scale(1)`;
    currentScaleValue = INIT_SCALE_VALUE;
  }
  document.removeEventListener(`keydown`, closeModal);
};

photoUploadCancel.addEventListener(`click`, closeModal);


const setCurrentScaleValue = (value) => {
  scaleControlValue.value = value + `%`;
  window.form.imgPreview.style.transform = `scale(` + (value / 100) + `)`;
};

let currentScaleValue = parseInt(scaleControlValue.value, 10);
window.form.imgPreview.style.transform = `scale(` + currentScaleValue / 100 + `)`;

scaleControlSmaller.addEventListener(`click`, () => {
  if (currentScaleValue !== STEP_SCALE_VALUE) {
    currentScaleValue -= STEP_SCALE_VALUE;
    setCurrentScaleValue(currentScaleValue);
  }
});

scaleControlBigger.addEventListener(`click`, () => {
  if (currentScaleValue !== INIT_SCALE_VALUE) {
    currentScaleValue += STEP_SCALE_VALUE;
    setCurrentScaleValue(currentScaleValue);
  }
});

const effectsRadio = document.querySelectorAll(`.effects__radio`);
effectsRadio.forEach((element) => {
  element.addEventListener(`change`, () => {
    window.form.imgPreview.className = `img-upload__preview`;
    window.form.imgPreview.style.removeProperty(`filter`);
    slider.classList.remove(`hidden`);

    switch (element.id) {
      case `effect-none`:
        slider.classList.add(`hidden`);
        window.form.imgPreview.className = `img-upload__preview`;
        break;
      case `effect-chrome`:
        window.form.imgPreview.classList.add(`effects__preview--chrome`);
        window.slider.getPinPosition(START_PIN_POSITION);
        break;
      case `effect-sepia`:
        window.form.imgPreview.classList.add(`effects__preview--sepia`);
        window.slider.getPinPosition(START_PIN_POSITION);
        break;
      case `effect-marvin`:
        window.form.imgPreview.classList.add(`effects__preview--marvin`);
        window.slider.getPinPosition(START_PIN_POSITION);
        break;
      case `effect-phobos`:
        window.form.imgPreview.classList.add(`effects__preview--phobos`);
        window.slider.getPinPosition(START_PIN_POSITION);
        break;
      case `effect-heat`:
        window.form.imgPreview.classList.add(`effects__preview--heat`);
        window.slider.getPinPosition(START_PIN_POSITION);
        break;
    }
  });
});

window.preview = {
  showModal,
  closeModal
};
