'use strict';
// модуль создание моков
(() => {

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

  // Функция получения случайных целых числел
  function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Функция генерации случайных данных
  const createData = (number) => {
    const data = [];

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
      const numberOfComments = getRandom(1, 15);

      // Создаем массив коментов
      for (let j = 0; j < numberOfComments; j++) {
        comments.push({
          avatar: `img/avatar-` + getRandom(1, 6) + `.svg`,
          message: COMMENTS_MESSAGE[getRandom(0, COMMENTS_MESSAGE.length - 1)],
          name: NAMES[getRandom(1, NAMES.length)],
        });
      }
      photo.comments = comments;
      data.push(photo);
    }
    return data;
  };

  window.data = {
    createData
  };
})();

