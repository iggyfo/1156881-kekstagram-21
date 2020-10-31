'use strict';
// отрисовка миниатюр

(() => {
  const pictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);
  const pictures = document.querySelector(`.pictures`);

  // Создает объект из шаблона
  function renderPictures(data) {
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
  }

  window.picture = {
    renderPictures
  };
})();
