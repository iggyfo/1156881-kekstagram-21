'use strict';

(() => {

  const getDataFromServer = (url, method, onSuccess, onError, data) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.open(method, url);

    xhr.addEventListener(`load`, () => {
      if (data === null) {
        xhr.status === 200 ? onSuccess(xhr.response) : onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      } else {
        xhr.status === 200 ? onSuccess() : onError();
      }
    });

    xhr.addEventListener(`error`, () => {
      data === null ? onError(`Произошла ошибка соединения`) : onError();
    });
    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = 10000;
    data === null ? xhr.send() : xhr.send(data);
  };

  window.load = {
    getDataFromServer
  };
})();
