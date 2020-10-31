'use strict';
(() => {
  // создаю 25 объектов
  const NUM_OF_DATA = 25;
  const pictureData = window.data.createData(NUM_OF_DATA);
  // отрисовываю все объекты в виде миниатюр
  window.picture.renderPictures(pictureData);

  const allPictures = document.querySelectorAll(`.picture`);
  // добавляю обработчик на все миниатюры
  allPictures.forEach((element, index) => {
    element.addEventListener(`click`, () => {
      // отрисовываю большое фото
      window.preview.renderBigPicture(pictureData[index]);
      // открываю/закрываю большое фото
      window.gallery.openBigPicture();
    });
  });
  // верификация формы
})();


