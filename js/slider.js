'use strict';
// модуль создание слайдера
(() => {
  // Rонстанта перемещаения на 1%
  const VALUE_OF_ONE_SHIFT = 4.53;
  const effectPin = document.querySelector(`.effect-level__pin`);
  const effectLeveldepth = document.querySelector(`.effect-level__depth`);
  const effectLevelValue = document.querySelector(`.effect-level__value`);
  const imgPreview = document.querySelector(`.img-upload__preview`);

  const initSlider = () => {
    effectPin.addEventListener(`mousedown`, (downEvt) => {
      downEvt.preventDefault();
      // Получаем начальную координату Х
      let startCoords = downEvt.clientX;

      const moveSlider = (moveEvt) => {
        moveEvt.preventDefault();
        // Вычисляем разницу между начальной и текущей координатой Х
        let shift = startCoords - moveEvt.clientX;
        // Перезаписываем начальную координату Х
        startCoords = moveEvt.clientX;
        // Переменная для применения стилей
        let pinValue = (effectPin.offsetLeft - shift) / VALUE_OF_ONE_SHIFT;

        if (pinValue >= 100) {
          pinValue = 100;
        } else if (pinValue <= 0) {
          pinValue = 0;
        }
        effectPin.style.left = pinValue + `%`;
        effectLeveldepth.style.width = pinValue + `%`;
        effectLevelValue.value = Math.round(pinValue);

        // Функция устанавливающая эфекты добавляя стили картинке при отпускании пина
        let effect = imgPreview.classList[1];

        switch (effect) {
          case `effect-none`:
            imgPreview.style.filter = `none`;
            break;
          case `effects__preview--chrome`:
            imgPreview.style.filter = `grayscale(` + effectLevelValue.value / 100 + `)`;
            break;
          case `effects__preview--sepia`:
            imgPreview.style.filter = `sepia(` + effectLevelValue.value / 100 + `)`;
            break;
          case `effects__preview--marvin`:
            imgPreview.style.filter = `invert(` + effectLevelValue.value + `%)`;
            break;
          case `effects__preview--phobos`:
            imgPreview.style.filter = `blur(` + window.utils.getEffectValue(effectLevelValue.value) + `px)`;
            break;
          case `effects__preview--heat`:
            imgPreview.style.filter = `brightness(` + window.utils.getEffectValue(effectLevelValue.value) + `)`;
            break;
        }
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
    initSlider
  };
})();
