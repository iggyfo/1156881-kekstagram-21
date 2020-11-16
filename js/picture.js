'use strict';
const CLASS_HIDDEN = `hidden`;
const AVATAR_SIZE = 35;
const NUM_RENDER_COMMENTS = 5;
const bigPicture = document.querySelector(`.big-picture`);
const photo = document.querySelector(`.big-picture img`);
const likesCount = bigPicture.querySelector(`.likes-count`);
const commentsCount = bigPicture.querySelector(`.comments-count`);
const socialComments = bigPicture.querySelector(`.social__comments`);
const socialCaption = bigPicture.querySelector(`.social__caption`);
const socialCommentCount = bigPicture.querySelector(`.social__comment-count`);
const commentsLoader = bigPicture.querySelector(`.comments-loader`);
let renderComments = [];
let commentCount;

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

const renderBigPicture = (data) => {
  photo.src = data.url;
  likesCount.textContent = data.likes;
  commentsCount.textContent = data.comments.length;
  socialCaption.textContent = data.description;
  while (socialComments.firstChild) {
    socialComments.removeChild(socialComments.firstChild);
  }
  commentCount = 0;
  renderComments = data.comments.slice();
  if (renderComments.length > NUM_RENDER_COMMENTS) {
    createComments(renderComments.slice(0, NUM_RENDER_COMMENTS));
    renderComments.splice(0, NUM_RENDER_COMMENTS);
    commentsLoader.classList.remove(CLASS_HIDDEN);
    commentCount = NUM_RENDER_COMMENTS;

    socialCommentCount.innerHTML = `${commentCount} из <span class='comments-count'>${data.comments.length}</span> комментариев`;
  } else {
    createComments(renderComments);
    commentsLoader.classList.add(CLASS_HIDDEN);

    socialCommentCount.innerHTML = `${data.comments.length} из <span class='comments-count'>${data.comments.length}</span> комментариев`;
  }
};

commentsLoader.addEventListener(`click`, () => {
  if (renderComments.length > NUM_RENDER_COMMENTS) {
    commentCount += NUM_RENDER_COMMENTS;
    createComments(renderComments.slice(0, NUM_RENDER_COMMENTS));
    renderComments.splice(0, NUM_RENDER_COMMENTS);
    socialCommentCount.innerHTML = `${commentCount} из <span class='comments-count'>${commentsCount.textContent}</span> комментариев`;
  } else {
    createComments(renderComments);
    renderComments.splice();
    commentsLoader.classList.add(CLASS_HIDDEN);
    socialCommentCount.innerHTML = `${commentsCount.textContent} из <span class='comments-count'>${commentsCount.textContent}</span> комментариев`;
  }
});

window.picture = {
  renderBigPicture
};
