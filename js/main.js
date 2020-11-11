'use strict';
(() => {
  const uploadFile = document.querySelector(`#upload-file`);
  const uploadCancel = document.querySelector(`#upload-cancel`);
  const inputHashtag = document.querySelector(`.text__hashtags`);
  const inputComment = document.querySelector(`.text__description`);
  const form = document.querySelector(`.img-upload__form`);


  // Загружаем данные с сервера и отображаем галерею изображений
  window.load.getDataFromServer(window.gallery.renderGallery);
  // Локально
  // const data = window.data.createData(25);
  // window.gallery.renderGallery(data);
  // window.filter.getPrimaryData(data);
  // отображение превью загруженного фото
  uploadFile.addEventListener(`change`, window.preview.showModal);
  uploadCancel.addEventListener(`click`, window.preview.closeModal);
  // Инициализируем слайдер
  window.slider.initSlider();
  // верификация формы
  inputHashtag.addEventListener(`input`, window.form.validateHashtags);
  inputComment.addEventListener(`input`, window.form.validateComment);

  // Отправка формы на сервер
  form.addEventListener(`submit`, window.form.submitHandler);
})();


