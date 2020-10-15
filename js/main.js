'use strict';

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

  for (let i = 1; i < number + 1; i++) {
    // Создаем объект - описание фотографии, опубликованной пользователем
    let photoDescription = {};

    // Добавляем адрес картинки
    const urlLink = `photos/` + i + `.jpg`;
    photoDescription.url = urlLink;

    // Добавляем описание картинки
    const descriptionText = `Описание фотографии №` + i;
    photoDescription.description = descriptionText;

    // Добовляем лайки
    const numberOfLikes = getRandom(15, 200);
    photoDescription.likes = numberOfLikes;

    // Создаем массив объектов с комментариями
    let commentsArray = [];

    // Создаем массив коментов
    for (let j = 0; j < getRandom(1, 6); j++) {
      commentsArray.push({
        avatar: `img/avatar-` + getRandom(1, 6) + `.svg`,
        message: commentsMessage[getRandom(1, 6)],
        name: namesMessage[getRandom(1, 8)],
      });
    }
    photoDescription.comments = commentsArray;
    descriptionArray.push(photoDescription);
  }
  return descriptionArray;
}

// Создает объект из шаблона
function createNode() {
  let pictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);
  let picture = pictureTemplate.cloneNode(true);
  return picture;
}

function drawPicture(picturesArray) {
  for (let i = 0; i <= picturesArray.length - 1; i++) {
    let pictures = document.querySelector(`.pictures`);
    let picture = createNode();
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

// функцию генерации случайных данных,
// функцию создания DOM-элемента на основе JS-объекта,
// функцию заполнения блока DOM-элементами на основе массива JS-объектов
