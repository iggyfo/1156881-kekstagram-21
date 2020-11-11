'use strict';
// показывет загруженное изображение и накладывает эфекты
(() => {
  // Открываем и закрываем модальное окно
  const START_PIN_POSITION = 100;
  const uploadOverlay = document.querySelector(`.img-upload__overlay`);

  const showModal = () => {
    document.body.classList.add(`modal-open`);
    uploadOverlay.classList.remove(`hidden`);
    slider.classList.add(`hidden`);
    document.addEventListener(`keydown`, closeModal);
  };

  const closeModal = (evt) => {
    if (evt.key === `Escape` || evt.type === `click` || evt.type === `submit`) {
      document.body.classList.remove(`modal-open`);
      uploadOverlay.classList.add(`hidden`);
    }
    document.removeEventListener(`keydown`, closeModal);
  };

  // Изменяем маштаб изображения
  const scaleControlSmaller = document.querySelector(`.scale__control--smaller`);
  const scaleControlBigger = document.querySelector(`.scale__control--bigger`);
  const scaleControlValue = document.querySelector(`.scale__control--value`);
  const imgPreview = document.querySelector(`.img-upload__preview`);
  const slider = document.querySelector(`.img-upload__effect-level`);

  let currentScaleValue = parseInt(scaleControlValue.value, 10);
  imgPreview.style.transform = `scale(` + currentScaleValue / 100 + `)`;

  scaleControlSmaller.addEventListener(`click`, () => {
    if (currentScaleValue !== 0) {
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

  // Добавляем эфекты
  const effectsRadio = document.querySelectorAll(`.effects__radio`);

  // Обработчик изменения типа накладываемого эфекта
  effectsRadio.forEach((element) => {
    element.addEventListener(`change`, () => {
      // При изменении фильтра задаем картинке класс и стили оригинального изображения
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

