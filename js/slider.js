'use strict';
// модуль создание слайдера
(() => {
  // Rонстанта перемещаения на 1%
  const VALUE_OF_ONE_SHIFT = 4.53;
  const effectPin = document.querySelector(`.effect-level__pin`);
  const effectLeveldepth = document.querySelector(`.effect-level__depth`);

  const onMouseDown = () => {
    effectPin.addEventListener(`mousedown`, (downEvt) => {
      downEvt.preventDefault();

      // Получаем начальную координату Х
      let startCoords = downEvt.clientX;

      const onMouseMove = (moveEvt) => {
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
        effectPin.style.pinValue = pinValue + `%`;
        effectLeveldepth.style.width = pinValue + `%`;
      };

      const onMouseUp = (upEvt) => {
        upEvt.preventDefault();

        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);
      };
      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
    });
  };

  window.slider = {
    onMouseDown
  };
})();
