'use strict';
// Модуль работающий с галереей изображений
(() => {
  const bigPicture = document.querySelector(`.big-picture`);
  const bigPictureClose = bigPicture.querySelector(`.big-picture__cancel`);

  const openBigPicture = () => {
    document.body.classList.add(`modal-open`);
    bigPicture.classList.remove(`hidden`);
    bigPictureClose.addEventListener(`click`, closeBigPicture);
    document.addEventListener(`keydown`, closeBigPicture);
  };

  const closeBigPicture = (evt) => {
    if (evt.key === `Escape` || evt.type === `click`) {
      document.body.classList.remove(`modal-open`);
      bigPicture.classList.add(`hidden`);
      bigPictureClose.removeEventListener(`click`, closeBigPicture);
      document.removeEventListener(`keydown`, closeBigPicture);
    }
  };

  window.gallery = {
    openBigPicture
  };
})();
