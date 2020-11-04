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

  window.utils = {
    getEffectValue,
    getNumDublicate
  };
})();
