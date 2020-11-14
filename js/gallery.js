'use strict';
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

  const renderGallery = (data) => {
    renderPictures(data);
    const allPictures = document.querySelectorAll(`.picture`);
    allPictures.forEach((element, index) => {
      element.addEventListener(`click`, () => {
        window.picture.renderBigPicture(data[index]);
        openBigPicture();
      });
    });
  };

  const onErrorDataLoad = (errorMessage) => {
    const node = document.createElement(`div`);
    node.style = `position: absolute;
    z-index: 100;
    margin: 0 30%;
    background: grey;
    top: 40vh;
    font-size: 26px;
    padding: 30px 10px 30px 10px;
    border: 7px solid darkgrey;
    border-radius: 10px;
    min-width: 41%;
    text-align: center;`;
    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.gallery = {
    openBigPicture,
    renderPictures,
    renderGallery,
    onErrorDataLoad
  };
})();
