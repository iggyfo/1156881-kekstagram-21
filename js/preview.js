'use strict';
(() => {
  const START_PIN_POSITION = 100;
  const ESC = `Escape`;
  const uploadOverlay = document.querySelector(`.img-upload__overlay`);
  const scaleControlSmaller = document.querySelector(`.scale__control--smaller`);
  const scaleControlBigger = document.querySelector(`.scale__control--bigger`);
  const scaleControlValue = document.querySelector(`.scale__control--value`);
  const imgPreview = document.querySelector(`.img-upload__preview`);
  const slider = document.querySelector(`.img-upload__effect-level`);

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

  let currentScaleValue = parseInt(scaleControlValue.value, 10);
  imgPreview.style.transform = `scale(` + currentScaleValue / 100 + `)`;

  scaleControlSmaller.addEventListener(`click`, () => {
    if (currentScaleValue !== 25) {
      currentScaleValue -= 25;
      scaleControlValue.value = currentScaleValue + `%`;
      imgPreview.style.transform = `scale(` + (currentScaleValue / 100) + `)`;
    }
  });

  scaleControlBigger.addEventListener(`click`, () => {
    if (currentScaleValue !== 100) {
      currentScaleValue += 25;
      scaleControlValue.value = currentScaleValue + `%`;
      imgPreview.style.transform = `scale(` + (currentScaleValue / 100) + `)`;
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
})();

