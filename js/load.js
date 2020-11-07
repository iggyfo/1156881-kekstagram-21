'use strict';

(() => {
  const URL = `https://21.javascript.pages.academy/kekstagram/data`;

  // Функция ошибки загрузки данных с сервера
  const errorHandler = (errorMessage) => {
    const node = document.createElement(`div`);
    node.style = `position: absolute;
    z-index: 100;
    margin: 0 30%;
    background: grey;
    top: 40vh;
    font-size: 26px;
    padding: 30px 10px 30px 10px;
    border: 7px solid darkgrey;
    border-radius: 10px;
    min-width: 41%;
    text-align: center;`;
    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  const getDataFromServer = (onSuccess) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.open(`GET`, URL);

    xhr.addEventListener(`load`, () => {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        errorHandler(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });

    xhr.addEventListener(`error`, () => {
      errorHandler(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, () => {
      errorHandler(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.send();
  };

  window.load = {
    getDataFromServer
  };
})();
