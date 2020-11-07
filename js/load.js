'use strict';

(() => {
  const URL = `https://21.javascript.pages.academy/kekstagram/data`;

  const getDataFromServer = function (onSuccess) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.open(`GET`, URL);

    xhr.addEventListener(`load`, function () {
      onSuccess(xhr.response);
    });

    xhr.send();
  };

  window.load = {
    getDataFromServer
  };
})();
