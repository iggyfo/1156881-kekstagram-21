'use strict';
const COMMENTS_MESSAGE = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`,
];

const NAMES = [
  `Артем`,
  `Артур`,
  `Дмитрий`,
  `Михаил`,
  `Игорь`,
  `Юрий`,
  `Лиза`,
  `Катя`,
];

const MIN_LIKES = 15;
const MAX_LIKES = 200;

const pictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);
const pictures = document.querySelector(`.pictures`);

// Функция получения случайных целых числел
function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция генерации случайных данных
function createDescriptions(number) {
  const descriptions = [];

  for (let i = 1; i <= number; i++) {
    // Создаем объект - описание фотографии, опубликованной пользователем
    const photo = {};

    // Добавляем адрес картинки
    photo.url = `photos/` + i + `.jpg`;

    // Добавляем описание картинки
    photo.description = `Описание фотографии №` + i;

    // Добавляем лайки
    photo.likes = getRandom(MIN_LIKES, MAX_LIKES);

    // Создаем массив объектов с комментариями
    const comments = [];
    const numberOfComments = getRandom(1, 6);

    // Создаем массив коментов
    for (let j = 0; j < numberOfComments; j++) {
      comments.push({
        avatar: `img/avatar-` + getRandom(1, 6) + `.svg`,
        message: COMMENTS_MESSAGE[getRandom(0, COMMENTS_MESSAGE.length - 1)],
        name: NAMES[getRandom(1, NAMES.length)],
      });
    }
    photo.comments = comments;
    descriptions.push(photo);
  }
  return descriptions;
}

// Создает объект из шаблона
function drawPicture(picturesArray) {
  for (let i = 0; i < picturesArray.length; i++) {
    const picture = pictureTemplate.cloneNode(true);
    const pictureImg = picture.querySelector(`img`);
    const pictureComments = picture.querySelector(`.picture__comments`);
    const pictureLikes = picture.querySelector(`.picture__likes`);
    pictureImg.src = picturesArray[i].url;
    pictureComments.textContent = picturesArray[i].comments.length;
    pictureLikes.textContent = picturesArray[i].likes;
    pictures.appendChild(picture);
  }
}

const descriptionArray = createDescriptions(25);
drawPicture(descriptionArray);

// module3-task2
const CLASS_HIDDEN = `hidden`;
const AVATAR_SIZE = 35;
const body = document.querySelector(`body`);
const firstPhoto = descriptionArray[0];
const bigPicture = document.querySelector(`.big-picture`);
const photo = bigPicture.querySelector(`.big-picture__img img`);
const likesCount = bigPicture.querySelector(`.likes-count`);
const commentsCount = bigPicture.querySelector(`.comments-count`);
const socialComments = bigPicture.querySelector(`.social__comments`);
const socialCaption = bigPicture.querySelector(`.social__caption`);
const socialCommentCount = bigPicture.querySelector(`.social__comment-count`);
const commentsLoader = bigPicture.querySelector(`.comments-loader`);

photo.src = firstPhoto.url;
likesCount.textContent = firstPhoto.likes;
commentsCount.textContent = firstPhoto.comments.length;
socialCaption.textContent = firstPhoto.description;

socialCommentCount.classList.add(CLASS_HIDDEN);
commentsLoader.classList.add(CLASS_HIDDEN);
socialComments.replaceChildren();

// Функция создения нового коментария
const newComment = (comments) => {
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

    socialComments.appendChild(li);
  });
};

newComment(firstPhoto.comments);
body.classList.add(`modal-open`);
bigPicture.classList.remove(`hidden`);
