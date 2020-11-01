'use strict';
// модуль работы с формами

(() => {
  // Открываем и закрываем модальное окно
  const uploadOverlay = document.querySelector(`.img-upload__overlay`);
  const uploadFile = document.querySelector(`#upload-file`);
  const uploadCancel = document.querySelector(`#upload-cancel`);


  const showModal = () => {
    document.body.classList.add(`modal-open`);
    uploadOverlay.classList.remove(`hidden`);
    document.addEventListener(`keydown`, closeModal);
  };

  const closeModal = (evt) => {
    if (evt.key === `Escape` || evt.type === `click`) {
      document.body.classList.remove(`modal-open`);
      uploadOverlay.classList.add(`hidden`);
    }
    document.removeEventListener(`keydown`, closeModal);
  };

  uploadFile.addEventListener(`change`, showModal);
  uploadCancel.addEventListener(`click`, closeModal);

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
      scaleControlValue.value = currentScaleValue + `%`;
      imgPreview.style.transform = `scale(` + (currentScaleValue / 100) + `)`;
    }
  });

  scaleControlBigger.addEventListener(`click`, () => {
    if (currentScaleValue !== 100) {
      currentScaleValue += 25;
      scaleControlValue.value = currentScaleValue + `%`;
      imgPreview.style.transform = `scale(` + (currentScaleValue / 100) + `)`;
    }
  });

  // Добавляем эфекты
  const effectsRadio = document.querySelectorAll(`.effects__radio`);
  const effectPin = document.querySelector(`.effect-level__pin`);
  const effectLeveldepth = document.querySelector(`.effect-level__depth`);


  // const effectLevelValue = document.querySelector(`.effect-level__value`);

  const onMouseDown = () => {
    effectPin.addEventListener(`mousedown`, (downEvt) => {
      downEvt.preventDefault();
      // Rонстанта перемещаения на 1%
      const VALUE_OF_ONE_SHIFT = 4.53;

      // Получаем начальную координату Х
      let startCoords = downEvt.clientX;

      const onMouseMove = (moveEvt) => {
        moveEvt.preventDefault();
        // Вычисляем разницу между начальной и текущей координатой Х
        let shift = startCoords - moveEvt.clientX;
        // Перезаписываем начальную координату Х
        startCoords = moveEvt.clientX;
        // Переменная для применения стилей
        let pinValue = (effectPin.offsetLeft - shift) / VALUE_OF_ONE_SHIFT;

        if (pinValue >= 100) {
          pinValue = 100;
        } else if (pinValue <= 0) {
          pinValue = 0;
        }
        effectPin.style.pinValue = pinValue + `%`;
        effectLeveldepth.style.width = pinValue + `%`;
      };

      const onMouseUp = (upEvt) => {
        upEvt.preventDefault();

        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);
      };
      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
    });
  };
  onMouseDown();

  // // Функция устанавливающая эфекты добавляя стили картинке при отпускании пина
  // const getFilterPinUp = (effect) => {
  //   effectPin.addEventListener(`mouseup`, () => {
  //     switch (effect) {
  //       case `effect-none`:
  //         imgPreview.style.filter = `none`;
  //         break;
  //       case `effect-chrome`:
  //         imgPreview.style.filter = `grayscale(` + effectLevelValue.value / 100 + `)`;
  //         break;
  //       case `effect-sepia`:
  //         imgPreview.style.filter = `sepia(` + effectLevelValue.value / 100 + `)`;
  //         break;
  //       case `effect-marvin`:
  //         imgPreview.style.filter = `invert(` + effectLevelValue.value + `%)`;
  //         break;
  //       case `effect-phobos`:
  //         imgPreview.style.filter = `blur(` + getEffectValue(effectLevelValue.value) + `px)`;
  //         break;
  //       case `effect-heat`:
  //         imgPreview.style.filter = `brightness(` + getEffectValue(effectLevelValue.value) + `)`;
  //         break;
  //     }
  //   });
  // };

  // Обработчик изменения типа накладываемого эфекта
  effectsRadio.forEach((element) => {
    element.addEventListener(`change`, () => {
      // При изменении фильтра задаем картинке класс и стили оригинального изображения
      imgPreview.className = `img-upload__preview`;
      imgPreview.style.removeProperty(`filter`);

      switch (element.id) {
        case `effect-none`:
          imgPreview.className = `img-upload__preview`;
          break;
        case `effect-chrome`:
          imgPreview.classList.add(`effects__preview--chrome`);
          break;
        case `effect-sepia`:
          imgPreview.classList.add(`effects__preview--sepia`);
          break;
        case `effect-marvin`:
          imgPreview.classList.add(`effects__preview--marvin`);
          break;
        case `effect-phobos`:
          imgPreview.classList.add(`effects__preview--phobos`);
          break;
        case `effect-heat`:
          imgPreview.classList.add(`effects__preview--heat`);
          break;
      }
    });
  });

  // Функция получает число от 1 до 100 и возвращает число от 1 до 3
  // const getEffectValue = (value) => {
  //   let ratio;
  //   switch (true) {
  //     case (value <= 33):
  //       ratio = 1;
  //       break;
  //     case (value >= 66):
  //       ratio = 3;
  //       break;
  //     default:
  //       ratio = 2;
  //   }
  //   return ratio;
  // };

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
})();
