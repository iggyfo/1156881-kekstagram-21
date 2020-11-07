'use strict';
(() => {
  const uploadFile = document.querySelector(`#upload-file`);
  const uploadCancel = document.querySelector(`#upload-cancel`);
  const inputHashtag = document.querySelector(`.text__hashtags`);
  const inputComment = document.querySelector(`.text__description`);

  const listenerGallery = (data) => {
    // отрисовываю все объекты в виде миниатюр
    // window.gallery.renderPictures(pictureData);
    const allPictures = document.querySelectorAll(`.picture`);
    // добавляю обработчик на все миниатюры
    allPictures.forEach((element, index) => {
      element.addEventListener(`click`, () => {
        // отрисовываю большое фото
        window.picture.renderBigPicture(data[index]);
        // открываю/закрываю большое фото
        window.gallery.openBigPicture();
      });
    });
  };
  window.load.getDataFromServer((data) => {
    window.gallery.renderPictures(data);
    listenerGallery(data);
  })();

  // отображение превью загруженного фото
  uploadFile.addEventListener(`change`, window.preview.showModal);
  uploadCancel.addEventListener(`click`, window.preview.closeModal);
  // верификация формы
  inputHashtag.addEventListener(`input`, window.form.validateHashtags);
  inputComment.addEventListener(`input`, window.form.validateComment);
  window.slider.initSlider();
})();


