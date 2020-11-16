'use strict';
(() => {
  const uploadFile = document.querySelector(`#upload-file`);
  const uploadCancel = document.querySelector(`#upload-cancel`);
  const inputHashtag = document.querySelector(`.text__hashtags`);
  const inputComment = document.querySelector(`.text__description`);

  const onSuccessDataLoad = (data) => {
    window.gallery.renderAll(data);
    window.filter.getPrimaryData(data);
  };

  window.api.loadData(onSuccessDataLoad, window.gallery.onErrorDataLoad);

  uploadFile.addEventListener(`change`, window.preview.showModal);
  uploadCancel.addEventListener(`click`, window.preview.closeModal);
  window.slider.initSlider();
  inputHashtag.addEventListener(`input`, window.form.validateHashtags);
  inputComment.addEventListener(`input`, window.form.validateComment);
  window.form.node.addEventListener(`submit`, (evt) => {
    window.api.uploadData(window.form.onSuccessUpload, window.form.onErrorUpload, new FormData(window.form.node), window.form.getCustomSettings(evt));
    evt.preventDefault();
  });
  window.form.node.addEventListener(`reset`, window.form.reset);
})();


