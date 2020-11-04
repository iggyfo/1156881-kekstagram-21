'use strict';
// модуль создание слайдера
(() => {
  // Rонстанта перемещаения на 1%
  const effectPin = document.querySelector(`.effect-level__pin`);
  const effectLeveldepth = document.querySelector(`.effect-level__depth`);
  const effectLevelValue = document.querySelector(`.effect-level__value`);
  const imgPreview = document.querySelector(`.img-upload__preview`);
  const sliderWidth = document.querySelector(`.effect-level__line`);

  // Функция устанавливает позицию пина от значения value (0 ... 100)
  const getPinPosition = (value) => {
    effectPin.style.left = value + `%`;
    effectLeveldepth.style.width = value + `%`;
    effectLevelValue.value = Math.round(value);
  };

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
        let pinValue = (effectPin.offsetLeft - shift) / (sliderWidth.offsetWidth / 100);

        if (pinValue >= 100) {
          pinValue = 100;
        } else if (pinValue <= 0) {
          pinValue = 0;
        }

        getPinPosition(pinValue);

        // Функция устанавливающая эфекты добавляя стили картинке при отпускании пина
        const effectsRadio = document.querySelectorAll(`.effects__radio`);

        // Обработчик изменения типа накладываемого эфекта
        effectsRadio.forEach((element) => {
          if (element.checked) {
            switch (element.id) {
              case `effect-none`:
                imgPreview.style.filter = `none`;
                break;
              case `effect-chrome`:
                imgPreview.style.filter = `grayscale(` + effectLevelValue.value / 100 + `)`;
                break;
              case `effect-sepia`:
                imgPreview.style.filter = `sepia(` + effectLevelValue.value / 100 + `)`;
                break;
              case `effect-marvin`:
                imgPreview.style.filter = `invert(` + effectLevelValue.value + `%)`;
                break;
              case `effect-phobos`:
                imgPreview.style.filter = `blur(` + window.utils.getEffectValue(effectLevelValue.value) + `px)`;
                break;
              case `effect-heat`:
                imgPreview.style.filter = `brightness(` + window.utils.getEffectValue(effectLevelValue.value) + `)`;
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
})();
