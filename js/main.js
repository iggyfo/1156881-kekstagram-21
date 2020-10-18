'use strict';

let pictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);
let pictures = document.querySelector(`.pictures`);

// Функция получения случайных целых числел
function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция генерации случайных данных
function createDescriptionArray(number) {
  let descriptionArray = [];

  const commentsMessage = [
    `Всё отлично!`,
    `В целом всё неплохо. Но не всё.`,
    `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
    `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
    `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
    `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`,
  ];

  const namesMessage = [
    `Артем`,
    `Артур`,
    `Дмитрий`,
    `Михаил`,
    `Игорь`,
    `Юрий`,
    `Лиза`,
    `Катя`,
  ];

  for (let i = 1; i <= number; i++) {
    // Создаем объект - описание фотографии, опубликованной пользователем
    let photo = {};

    // Добавляем адрес картинки
    photo.url = `photos/` + i + `.jpg`;

    // Добавляем описание картинки
    photo.description = `Описание фотографии №` + i;

    // Добавляем лайки
    photo.likes = getRandom(15, 200);

    // Создаем массив объектов с комментариями
    let comments = [];
    let numberOfComments = getRandom(1, 6);

    // Создаем массив коментов
    for (let j = 0; j < numberOfComments; j++) {
      comments.push({
        avatar: `img/avatar-` + getRandom(1, 6) + `.svg`,
        message: commentsMessage[getRandom(1, commentsMessage.length)],
        name: namesMessage[getRandom(1, namesMessage.length)],
      });
    }
    photo.comments = comments;
    descriptionArray.push(photo);
  }
  return descriptionArray;
}

// Создает объект из шаблона
function drawPicture(picturesArray) {
  for (let i = 0; i < picturesArray.length; i++) {
    let picture = pictureTemplate.cloneNode(true);
    let pictureImg = picture.querySelector(`img`);
    let pictureComments = picture.querySelector(`.picture__comments`);
    let pictureLikes = picture.querySelector(`.picture__likes`);
    pictureImg.src = picturesArray[i].url;
    pictureComments.textContent = picturesArray[i].comments.length;
    pictureLikes.textContent = picturesArray[i].likes;
    pictures.appendChild(picture);
  }
}

let descriptionArray = createDescriptionArray(25);
drawPicture(descriptionArray);
