'use strict';
// Создает фотографию пользователя с комментариями

(() => {
  const CLASS_HIDDEN = `hidden`;
  const AVATAR_SIZE = 35;
  const bigPicture = document.querySelector(`.big-picture`);
  const photo = document.querySelector(`.big-picture img`);
  const likesCount = bigPicture.querySelector(`.likes-count`);
  const commentsCount = bigPicture.querySelector(`.comments-count`);
  const socialComments = bigPicture.querySelector(`.social__comments`);
  const socialCaption = bigPicture.querySelector(`.social__caption`);
  const socialCommentCount = bigPicture.querySelector(`.social__comment-count`);
  const commentsLoader = bigPicture.querySelector(`.comments-loader`);

  // Функция создения нового коментария
  const createComments = (comments) => {
    const fragment = document.createDocumentFragment();
    comments.forEach((element) => {

      const li = document.createElement(`li`);
      li.classList.add(`social__comment`);

      const img = document.createElement(`img`);
      img.classList.add(`social__picture`);
      img.src = element.avatar;
      img.alt = element.name;
      img.width = AVATAR_SIZE;
      img.height = AVATAR_SIZE;
      li.appendChild(img);

      const p = document.createElement(`p`);
      p.classList.add(`social__text`);
      p.textContent = element.message;
      li.appendChild(p);
      fragment.appendChild(li);
    });
    socialComments.appendChild(fragment);

  };

  // Функция отрисовки большого изображения
  const renderBigPicture = (data) => {
    photo.src = data.url;
    likesCount.textContent = data.likes;
    commentsCount.textContent = data.comments.length;
    socialCaption.textContent = data.description;

    socialCommentCount.classList.add(CLASS_HIDDEN);
    commentsLoader.classList.add(CLASS_HIDDEN);
    while (socialComments.firstChild) {
      socialComments.removeChild(socialComments.firstChild);
    }
    createComments(data.comments);
  };

  window.picture = {
    renderBigPicture
  };
})();
