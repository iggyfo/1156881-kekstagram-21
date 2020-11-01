'use strict';
// модуль создание моков
(() => {
// Функция получает число от 1 до 100 и возвращает число от 1 до 3
  const getEffectValue = (value) => {
    let ratio;
    switch (true) {
      case (value <= 33):
        ratio = 1;
        break;
      case (value >= 66):
        ratio = 3;
        break;
      default:
        ratio = 2;
    }
    return ratio;
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
