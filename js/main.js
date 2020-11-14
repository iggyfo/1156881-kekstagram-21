'use strict';
(() => {
  const uploadFile = document.querySelector(`#upload-file`);
  const uploadCancel = document.querySelector(`#upload-cancel`);
  const inputHashtag = document.querySelector(`.text__hashtags`);
  const inputComment = document.querySelector(`.text__description`);
  const form = document.querySelector(`.img-upload__form`);
  const main = document.querySelector(`main`);
  const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);

  const optionsForServer = {
    loadUrl: `https://21.javascript.pages.academy/kekstagram/data`,
    loadMethod: `GET`,
    UploadUrl: `https://21.javascript.pages.academy/kekstagram`,
    UploadMethod: `POST`
  };

  // Загрузка данных с сервера
  const onErrorDataLoad = (errorMessage) => {
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

  const onSuccessDataLoad = (data) => {
    window.gallery.renderGallery(data);
    window.filter.getPrimaryData(data);
  };

  // Отправка данных на сервер
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

  const onSuccessUpload = () => {
    const successNode = successTemplate.cloneNode(true);
    main.appendChild(successNode);
    const successOverlay = main.querySelector(`.success`);
    successOverlay.addEventListener(`click`, closeSuccessMessage);
    document.addEventListener(`keydown`, closeSuccessMessage);
  };

  const onErrorUpload = () => {
    const errorNode = errorTemplate.cloneNode(true);
    main.appendChild(errorNode);
    const errorOverlay = main.querySelector(`.error`);
    errorOverlay.addEventListener(`click`, closeErrorMessage);
    document.addEventListener(`keydown`, closeErrorMessage);
  };

  window.load.getDataFromServer(optionsForServer.loadUrl, optionsForServer.loadMethod, onSuccessDataLoad, onErrorDataLoad, null);

  uploadFile.addEventListener(`change`, window.preview.showModal);
  uploadCancel.addEventListener(`click`, window.preview.closeModal);
  window.slider.initSlider();
  inputHashtag.addEventListener(`input`, window.form.validateHashtags);
  inputComment.addEventListener(`input`, window.form.validateComment);
  form.addEventListener(`submit`, (evt) => {
    window.load.getDataFromServer(optionsForServer.UploadUrl, optionsForServer.UploadMethod, onSuccessUpload, onErrorUpload, new FormData(form), window.form.getCustomFormSettings(evt));
    evt.preventDefault();
  });
})();


