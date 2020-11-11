'use strict';
(() => {
  const uploadFile = document.querySelector(`#upload-file`);
  const uploadCancel = document.querySelector(`#upload-cancel`);
  const inputHashtag = document.querySelector(`.text__hashtags`);
  const inputComment = document.querySelector(`.text__description`);
  const form = document.querySelector(`.img-upload__form`);

  window.load.getDataFromServer(window.gallery.renderGallery);
  uploadFile.addEventListener(`change`, window.preview.showModal);
  uploadCancel.addEventListener(`click`, window.preview.closeModal);
  window.slider.initSlider();
  inputHashtag.addEventListener(`input`, window.form.validateHashtags);
  inputComment.addEventListener(`input`, window.form.validateComment);
  form.addEventListener(`submit`, window.form.submitHandler);
})();


