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

// module3-task2 (Показываем первое фото пользователей с коментами)
// module4-task2 (Показываем фото пользователей по клику на фото)
const CLASS_HIDDEN = `hidden`;
const AVATAR_SIZE = 35;
const bigPicture = document.querySelector(`.big-picture`);
const bigPictureClose = bigPicture.querySelector(`.big-picture__cancel`);
const photo = bigPicture.querySelector(`.big-picture__img img`);
const likesCount = bigPicture.querySelector(`.likes-count`);
const commentsCount = bigPicture.querySelector(`.comments-count`);
const socialComments = bigPicture.querySelector(`.social__comments`);
const socialCaption = bigPicture.querySelector(`.social__caption`);
const socialCommentCount = bigPicture.querySelector(`.social__comment-count`);
const commentsLoader = bigPicture.querySelector(`.comments-loader`);
const allPictures = document.querySelectorAll(`.picture`);

// Функция создения нового коментария
const createNewComments = (comments) => {
  comments.forEach((element) => {
    const fragment = document.createDocumentFragment();
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
    socialComments.appendChild(fragment);
  });
};

const openBigPicture = () => {
  document.body.classList.add(`modal-open`);
  bigPicture.classList.remove(`hidden`);
  document.addEventListener(`keydown`, isEscEvent);
};

const closeBigPicture = () => {
  document.body.classList.remove(`modal-open`);
  bigPicture.classList.add(`hidden`);
};

const createNewPhoto = (photoObj) => {
  photo.src = photoObj.url;
  likesCount.textContent = photoObj.likes;
  commentsCount.textContent = photoObj.comments.length;
  socialCaption.textContent = photoObj.description;

  socialCommentCount.classList.add(CLASS_HIDDEN);
  commentsLoader.classList.add(CLASS_HIDDEN);
  while (socialComments.firstChild) {
    socialComments.removeChild(socialComments.firstChild);
  }
  createNewComments(photoObj.comments);
};

const isEscEvent = (evt) => {
  if (evt.key === `Escape`) {
    closeBigPicture();
    document.removeEventListener(`keydown`, isEscEvent);
  }
};

allPictures.forEach((element, index) => {
  element.addEventListener(`click`, () => {
    createNewPhoto(descriptionArray[index]);
    openBigPicture();
    bigPictureClose.addEventListener(`click`, () => {
      closeBigPicture();
    });
  });
});

// module4-task1 (Загрузка фото и валидация полей формы)
// Открываем и закрываем модальное окно
const uploadOverlay = document.querySelector(`.img-upload__overlay`);
const uploadFile = document.querySelector(`#upload-file`);
const uploadCancel = document.querySelector(`#upload-cancel`);


const showModal = () => {
  document.body.classList.add(`modal-open`);
  uploadOverlay.classList.remove(`hidden`);
};

const closeModal = () => {
  document.body.classList.remove(`modal-open`);
  uploadOverlay.classList.add(`hidden`);
};

uploadFile.addEventListener(`change`, () => {
  showModal();

  document.addEventListener(`keydown`, (evt) => {
    // Дополнительно проверяем не является ли активными поля ввода хэштегов и комментариев.
    if (evt.key === `Escape` && document.activeElement.name !== `hashtags` && document.activeElement.name !== `description`) {
      closeModal();
    }
  });
});

uploadCancel.addEventListener(`click`, () => {
  closeModal();
});

// Изменяем маштаб изображения
const scaleControlSmaller = document.querySelector(`.scale__control--smaller`);
const scaleControlBigger = document.querySelector(`.scale__control--bigger`);
const scaleControlValue = document.querySelector(`.scale__control--value`);
const imgPreview = document.querySelector(`.img-upload__preview`);

let currentScaleValue = parseInt(scaleControlValue.value, 10);
imgPreview.style.transform = `scale(` + currentScaleValue / 100 + `)`;

scaleControlSmaller.addEventListener(`click`, () => {
  if (currentScaleValue !== 0) {
    currentScaleValue -= 25;
    scaleControlValue.value = String(currentScaleValue) + `%`;
    imgPreview.style.transform = `scale(` + String(currentScaleValue / 100) + `)`;
  }
});

scaleControlBigger.addEventListener(`click`, () => {
  if (currentScaleValue !== 100) {
    currentScaleValue += 25;
    scaleControlValue.value = String(currentScaleValue) + `%`;
    imgPreview.style.transform = `scale(` + String(currentScaleValue / 100) + `)`;
  }
});

// Добавляем эфекты
const effectsRadio = document.querySelectorAll(`.effects__radio`);
const effectPin = document.querySelector(`.effect-level__pin`);
const effectLevelValue = document.querySelector(`.effect-level__value`);

// Функция устанавливающая эфекты добавляя стили картинке при отпускании пина
const getFilterPinUp = (effect) => {
  effectPin.addEventListener(`mouseup`, () => {
    switch (effect) {
      case `effect-none`:
        imgPreview.style.filter = `none`;
        break;
      case `effect-chrome`:
        imgPreview.style.filter = `grayscale(` + effectLevelValue.value / 100 + `)`;
        break;
      case `effect-sepia`:
        imgPreview.style.filter = `sepia(` + effectLevelValue.value / 100 + `)`;
        break;
      case `effect-marvin`:
        imgPreview.style.filter = `invert(` + effectLevelValue.value + `%)`;
        break;
      case `effect-phobos`:
        imgPreview.style.filter = `blur(` + getEffectValue(effectLevelValue.value) + `px)`;
        break;
      case `effect-heat`:
        imgPreview.style.filter = `brightness(` + getEffectValue(effectLevelValue.value) + `)`;
        break;
    }
  });
};

// Обработчик изменения типа накладываемого эфекта
effectsRadio.forEach((element) => {
  element.addEventListener(`change`, () => {
    // При изменении фильтра задаем картинке класс и стили оригинального изображения
    imgPreview.className = `img-upload__preview`;
    imgPreview.style.removeProperty(`filter`);

    switch (element.id) {
      case `effect-none`:
        imgPreview.className = `img-upload__preview`;
        getFilterPinUp(element.id);
        break;
      case `effect-chrome`:
        imgPreview.classList.add(`effects__preview--chrome`);
        getFilterPinUp(element.id);
        break;
      case `effect-sepia`:
        imgPreview.classList.add(`effects__preview--sepia`);
        getFilterPinUp(element.id);
        break;
      case `effect-marvin`:
        imgPreview.classList.add(`effects__preview--marvin`);
        getFilterPinUp(element.id);
        break;
      case `effect-phobos`:
        imgPreview.classList.add(`effects__preview--phobos`);
        getFilterPinUp(element.id);
        break;
      case `effect-heat`:
        imgPreview.classList.add(`effects__preview--heat`);
        getFilterPinUp(element.id);
        break;
    }
  });
});

// Функция получает число от 1 до 100 и возвращает число от 1 до 3
const getEffectValue = (value) => {
  let ratio;
  switch (true) {
    case (value <= 33):
      ratio = 1;
      break;
    case (value >= 66):
      ratio = 3;
      break;
    default:
      ratio = 2;
  }
  return ratio;
};

const inputHashtag = document.querySelector(`.text__hashtags`);
const inputComment = document.querySelector(`.text__description`);
const regex = /^#[А-Яа-яA-Za-z0-9]{2,19}$/;
const MAX_NUM_HASHTAGS = 5;
const MAX_NUM_COMMENTS = 140;
const MAX_NUM_CHAR = 20;

const getNumDublicate = (arr, element) => {
  let countDublicate = 0;
  arr.forEach((arrElem) => {
    if (arrElem === element) {
      countDublicate++;
    }
  });
  return countDublicate;
};

// Добавляем обработчик на поле ввода хэштега
inputHashtag.addEventListener(`input`, () => {
  const hashTags = inputHashtag.value.split(` `);
  inputHashtag.setCustomValidity(``);
  if (hashTags.length > MAX_NUM_HASHTAGS) {
    inputHashtag.setCustomValidity(`Максимальное количество хэштегов - не более пяти`);
    return;
  }

  for (let tag of hashTags) {
    // Проверяем на максимальное количество знаков
    if (tag.length > MAX_NUM_CHAR) {
      inputHashtag.setCustomValidity(`Максимальное количество знаков в хэштеге - не более 20 ` + tag);
      return;
    }
    // Проверяем есть ли повторяющиеся хэштеги
    if (getNumDublicate(hashTags, tag) > 1) {
      inputHashtag.setCustomValidity(`Хештеги не должны повторяться - удалите один из ` + tag);
      return;
    }
    // Проверяем содержание хэштега
    if (!regex.test(tag)) {
      inputHashtag.setCustomValidity(`Хештег ` + tag + ` должен начинаться с # и состоять из букв/цифр`);
      return;
    }
  }
});

// Добавляем обработчик на поле ввода комментария
inputComment.addEventListener(`input`, () => {
  inputComment.setCustomValidity(``);
  if (inputComment.textLength > MAX_NUM_COMMENTS) {
    inputComment.setCustomValidity(`Длина комментария должна быть не более ` + MAX_NUM_COMMENTS + ` символов`);
  }
});
