'use strict';

(() => {
  const apiOptions = {
    LOAD_URL: `https://21.javascript.pages.academy/kekstagram/data`,
    LOAD_METHOD: `GET`,
    UPLOAD_URL: `https://21.javascript.pages.academy/kekstagram`,
    UPLOAD_METHOD: `POST`,
    TIMEOUT: 10000
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

    xhr.timeout = apiOptions.TIMEOUT;
    return xhr;
  };

  const loadData = (onSuccess, onError) => {
    const xhr = getApi(apiOptions.LOAD_URL, apiOptions.LOAD_METHOD, onSuccess, onError);
    xhr.send();
  };

  const uploadData = (onSuccess, onError, data) => {
    const xhr = getApi(apiOptions.UPLOAD_URL, apiOptions.UPLOAD_METHOD, onSuccess, onError);
    xhr.send(data);
  };

  window.api = {
    loadData,
    uploadData
  };
})();
