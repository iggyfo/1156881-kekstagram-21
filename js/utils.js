'use strict';
(() => {
  const getEffectValue = (value) => {
    return 3 / 100 * value;
  };

  const getNumDublicate = (arr, element) => {
    let countDublicate = 0;
    arr.forEach((arrElem) => {
      if (arrElem === element) {
        countDublicate++;
      }
    });
    return countDublicate;
  };

  const buttonToggle = (evt, buttons, ACTIVE_CLASS) => {
    buttons.forEach((element) => {
      element.classList.remove(ACTIVE_CLASS);
    });
    evt.target.classList.add(ACTIVE_CLASS);
  };

  const DEBOUNCE_INTERVAL = 500; // ms

  const debounce = function (cb) {
    let lastTimeout = null;
    return function (...parameters) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
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
