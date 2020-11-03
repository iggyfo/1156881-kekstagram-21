'use strict';
// показывет загруженное изображение и накладывает эфекты
(() => {
  // Открываем и закрываем модальное окно
  const uploadOverlay = document.querySelector(`.img-upload__overlay`);

  const showModal = () => {
    document.body.classList.add(`modal-open`);
    uploadOverlay.classList.remove(`hidden`);
    document.addEventListener(`keydown`, closeModal);
  };

  const closeModal = (evt) => {
    if (evt.key === `Escape` || evt.type === `click`) {
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

      switch (element.id) {
        case `effect-none`:
          imgPreview.className = `img-upload__preview`;
          break;
        case `effect-chrome`:
          imgPreview.classList.add(`effects__preview--chrome`);
          break;
        case `effect-sepia`:
          imgPreview.classList.add(`effects__preview--sepia`);
          break;
        case `effect-marvin`:
          imgPreview.classList.add(`effects__preview--marvin`);
          break;
        case `effect-phobos`:
          imgPreview.classList.add(`effects__preview--phobos`);
          break;
        case `effect-heat`:
          imgPreview.classList.add(`effects__preview--heat`);
          break;
      }
    });
  });

  window.preview = {
    showModal,
    closeModal
  };
})();

