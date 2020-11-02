'use strict';
(() => {
  // создаю 25 объектов
  const NUM_OF_DATA = 25;
  const pictureData = window.data.createData(NUM_OF_DATA);
  const uploadFile = document.querySelector(`#upload-file`);
  const uploadCancel = document.querySelector(`#upload-cancel`);
  const inputHashtag = document.querySelector(`.text__hashtags`);
  const inputComment = document.querySelector(`.text__description`);

  // отрисовываю все объекты в виде миниатюр
  window.gallery.renderPictures(pictureData);
  const allPictures = document.querySelectorAll(`.picture`);
  // добавляю обработчик на все миниатюры
  allPictures.forEach((element, index) => {
    element.addEventListener(`click`, () => {
      // отрисовываю большое фото
      window.picture.renderBigPicture(pictureData[index]);
      // открываю/закрываю большое фото
      window.gallery.openBigPicture();
    });
  });
  // отображение превью загруженного фото
  uploadFile.addEventListener(`change`, window.preview.showModal);
  uploadCancel.addEventListener(`click`, window.preview.closeModal);
  // верификация формы
  inputHashtag.addEventListener(`input`, window.form.validateHashtags);
  inputComment.addEventListener(`input`, window.form.validateComment);
})();


