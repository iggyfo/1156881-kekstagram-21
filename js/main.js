'use strict';

const onSuccessDataLoad = (data) => {
  window.gallery.renderAll(data);
  window.filter.getPrimaryData(data);
};

window.api.loadData(onSuccessDataLoad, window.gallery.onErrorDataLoad);
window.slider.initSlider();

window.form.photoUpload.addEventListener(`submit`, (evt) => {
  window.api.uploadData(window.form.onSuccessUpload, window.form.onErrorUpload, new FormData(window.form.photoUpload), window.form.getCustomSettings(evt));
  evt.preventDefault();
});
window.form.photoUpload.addEventListener(`reset`, window.form.reset);
