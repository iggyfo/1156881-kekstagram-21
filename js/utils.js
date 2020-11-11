'use strict';
// модуль создание моков
(() => {
// Функция получает число от 1 до 100 и возвращает число от 1 до 3
  const getEffectValue = (value) => {
    return 3 / 100 * value;
  };

  // Функция поиска дубликатов в строке
  const getNumDublicate = (arr, element) => {
    let countDublicate = 0;
    arr.forEach((arrElem) => {
      if (arrElem === element) {
        countDublicate++;
      }
    });
    return countDublicate;
  };

  // Функуция переключения классов на кнопках
  const buttonToggle = (evt, buttons, ACTIVE_CLASS) => {
    buttons.forEach((element) => {
      element.classList.remove(ACTIVE_CLASS);
    });
    evt.target.classList.add(ACTIVE_CLASS);
  };

  // Функция устранения дребезга
  const DEBOUNCE_INTERVAL = 500; // ms

  const debounce = (cb) => {
    let lastTimeout = null;
    return (...parameters) => {
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(() => {
        cb(...parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.utils = {
    getEffectValue,
    getNumDublicate,
    buttonToggle,
    debounce
  };
})();
