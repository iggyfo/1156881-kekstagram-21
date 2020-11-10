'use strict';
(() => {
  const main = document.querySelector(`main`);
  const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
  const URL = `https://21.javascript.pages.academy/kekstagram`;

  const sendDataToServer = (data) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.open(`POST`, URL);

    xhr.addEventListener(`load`, () => {
      if (xhr.status === 200) {
        successUpload();
      } else {
        errorUpload();
      }
    });

    xhr.addEventListener(`error`, () => {
      errorUpload();
    });
    xhr.timeout = 10000;
    xhr.send(data);
  };
  const closeSuccessMessage = (evt) => {
    const successOverlay = main.querySelector(`.success`);
    const successCloseBtn = successOverlay.querySelector(`.success__button`);
    if (evt.target === successOverlay || evt.target === successCloseBtn || evt.key === `Escape`) {
      main.removeChild(main.lastChild);
      document.removeEventListener(`keydown`, closeSuccessMessage);
    }
  };

  const closeErrorMessage = (evt) => {
    const errorOverlay = main.querySelector(`.error`);
    const errorCloseButton = main.querySelector(`.error__button`);
    if (evt.target === errorOverlay || evt.target === errorCloseButton || evt.key === `Escape`) {
      main.removeChild(main.lastChild);
      document.removeEventListener(`keydown`, closeErrorMessage);
    }
  };

  const successUpload = () => {
    const successNode = successTemplate.cloneNode(true);
    main.appendChild(successNode);
    const successOverlay = main.querySelector(`.success`);
    successOverlay.addEventListener(`click`, closeSuccessMessage);
    document.addEventListener(`keydown`, closeSuccessMessage);
  };

  const errorUpload = () => {
    const errorNode = errorTemplate.cloneNode(true);
    main.appendChild(errorNode);
    const errorOverlay = main.querySelector(`.error`);
    errorOverlay.addEventListener(`click`, closeErrorMessage);
    document.addEventListener(`keydown`, closeErrorMessage);
  };

  window.upload = {
    sendDataToServer
  };
})();
