'use strict';

(() => {
  const TIMEOUT = 10000; // ms

  const Url = {
    load: `https://21.javascript.pages.academy/kekstagram/data`,
    upload: `https://21.javascript.pages.academy/kekstagram`
  };

  const Method = {
    load: `GET`,
    upload: `POST`,
  };

  const getApi = (url, method, onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.open(method, url);

    xhr.addEventListener(`load`, () => {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = TIMEOUT;
    return xhr;
  };

  const loadData = (onSuccess, onError) => {
    const xhr = getApi(Url.load, Method.load, onSuccess, onError);
    xhr.send();
  };

  const uploadData = (onSuccess, onError, data) => {
    const xhr = getApi(Url.upload, Method.upload, onSuccess, onError);
    xhr.send(data);
  };

  window.api = {
    loadData,
    uploadData
  };
})();
