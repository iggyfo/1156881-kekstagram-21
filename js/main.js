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
        message: COMMENTS_MESSAGE[getRandom(1, COMMENTS_MESSAGE.length)],
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


// Загрузка фотографии и открытие формы -----------------------------------------------------

// Открываем и закрываем модальное окно
const uploadOverlay = document.querySelector(`.img-upload__overlay`);
const body = document.querySelector(`body`);
const uploadFile = document.querySelector(`#upload-file`);
const uploadCancel = document.querySelector(`#upload-cancel`);


const showModal = () => {
  body.classList.add(`modal-open`);
  uploadOverlay.classList.remove(`hidden`);
};

const closeModal = () => {
  body.classList.remove(`modal-open`);
  uploadOverlay.classList.add(`hidden`);
};

uploadFile.addEventListener(`change`, () => {
  showModal();

  document.addEventListener(`keydown`, (evt) => {
    // Дополнительно проверяем не является ли активными поля ввода хэштегов и комментариев.
    // (по идее нужно получить состояние фокуса, но пока не понял как это реализовать)
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
    if (effect === `effect-none`) {
      imgPreview.style.filter = `none`;
    } else if (effect === `effect-chrome`) {
      imgPreview.style.filter = `grayscale(` + String(effectLevelValue.value / 100) + `)`;
    } else if (effect === `effect-sepia`) {
      imgPreview.style.filter = `sepia(` + String(effectLevelValue.value / 100) + `)`;
    } else if (effect === `effect-marvin`) {
      imgPreview.style.filter = `invert(` + String(effectLevelValue.value) + `%)`;
    } else if (effect === `effect-phobos`) {
      imgPreview.style.filter = `blur(` + String(getEffectValue(effectLevelValue.value)) + `px)`;
    } else if (effect === `effect-heat`) {
      imgPreview.style.filter = `brightness(` + String(getEffectValue(effectLevelValue.value)) + `)`;
    }
  });
};

// Обработчик изменения типа накладываемого эфекта
effectsRadio.forEach((element) => {
  element.addEventListener(`change`, () => {
    // При изменении фильтра задаем картинке класс и стили оригинального изображения
    imgPreview.className = ``;
    imgPreview.style.removeProperty(`filter`);

    if (element.id === `effect-none`) {
      imgPreview.className = ``;
      getFilterPinUp(element.id);
    } else if (element.id === `effect-chrome`) {
      imgPreview.classList.add(`effects__preview--chrome`);
      getFilterPinUp(element.id);
    } else if (element.id === `effect-sepia`) {
      imgPreview.classList.add(`effects__preview--sepia`);
      getFilterPinUp(element.id);
    } else if (element.id === `effect-marvin`) {
      imgPreview.classList.add(`effects__preview--marvin`);
      getFilterPinUp(element.id);
    } else if (element.id === `effect-phobos`) {
      imgPreview.classList.add(`effects__preview--phobos`);
      getFilterPinUp(element.id);
    } else if (element.id === `effect-heat`) {
      imgPreview.classList.add(`effects__preview--heat`);
      getFilterPinUp(element.id);
    }
  });
});

// Функция получает число от 1 до 100 и возвращает чисор от 1 до 3
// Может как-то по другому преобразовывать???
const getEffectValue = (value) => {
  if (value <= 33) {
    return 1;
  } if (value >= 66) {
    return 3;
  } else {
    return 2;
  }
};

const inputHashtag = document.querySelector(`.text__hashtags`);
const inputComment = document.querySelector(`.text__description`);
const regex = /#[А-Яа-я]{2,20}/;
const MAX_NUM_HASHTAGS = 5;
const MAX_NUM_COMMENTS = 140;

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
inputHashtag.addEventListener(`change`, () => {
  const hashTags = inputHashtag.value.split(` `);
  inputHashtag.setCustomValidity(``);
  if (hashTags.length > MAX_NUM_HASHTAGS) {
    inputHashtag.setCustomValidity(`Максимальное количество хэштегов - не более пяти`);
  }

  hashTags.forEach((element) => {
    if (getNumDublicate(hashTags, element) > 1) {
      inputHashtag.setCustomValidity(`Хештеги не должны повторяться - удалите один из ` + element);
    }
    if (!regex.test(element)) {
      inputHashtag.setCustomValidity(`Хештег ` + element + ` должен начинаться с решетки и состоять из кирилических букв`);
    }
  });
});

// Добавляем обработчик на поле ввода комментария
inputComment.addEventListener(`change`, () => {
  inputComment.setCustomValidity(``);
  if (inputComment.textLength > MAX_NUM_COMMENTS) {
    inputComment.setCustomValidity(`Длина комментария должна быть не более ` + MAX_NUM_COMMENTS + ` символов`);
  }
});
