'use strict';
// Модуль работающий с галереей изображений
(() => {
  const bigPicture = document.querySelector(`.big-picture`);
  const bigPictureClose = bigPicture.querySelector(`.big-picture__cancel`);
  const pictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);
  const pictures = document.querySelector(`.pictures`);

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

  // Создает объект из шаблона
  const renderPictures = (data) => {
    for (let i = 0; i < data.length; i++) {
      const picture = pictureTemplate.cloneNode(true);
      const pictureImg = picture.querySelector(`img`);
      const pictureComments = picture.querySelector(`.picture__comments`);
      const pictureLikes = picture.querySelector(`.picture__likes`);
      pictureImg.src = data[i].url;
      pictureComments.textContent = data[i].comments.length;
      pictureLikes.textContent = data[i].likes;
      pictures.appendChild(picture);
    }
  };

  window.gallery = {
    openBigPicture,
    renderPictures
  };
})();
